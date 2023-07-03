//Query selector develve el primer elemento que coincida con el selector especificado 

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

const PLAYER_WIDTH = 10;
const LASER_COOLDOWN = 0.4;

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;
const ENEMY_COOLDOWN = 10;

const GAME_STATE = {
  lastTime: Date.now(),
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  playerCooldown: 0,
  lasers: [],
  enemies: [],
  enemyLasers: [],
  gameOver: false
};

//Funcion que ayuda a provotar colisiones entre los elementos

function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

//Funcion que ayuda a determinar la posicion de los elementos

function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

//Funcion que ayuda a poner los limites de los elementos

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

//Funcion random que ayuda a hacer que los disparos de los enemigos sean aleatorios y no todos a la vez o por oleadas 

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

//Creacion de la nave y posicion inicial de la misma

function createPlayer($container) {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 150;
  const player = document.createElement("img");
  player.src = "img/thor.png";
  player.className = "player";
  $container.appendChild(player);
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

//Funcion que destruye la nave

function destroyPlayer($container, player) {
  $container.removeChild(player);
  let sonido = new Audio("sound/gameOver.mp3");
  sonido.play()
  GAME_STATE.gameOver = true;
}

//Funcion que actualiza la nave y los lasers

function updatePlayer(dt, $container) {
  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const $player = document.querySelector(".player");
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

//Creacion de los lasers

function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/martillo.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  let sonido = new Audio("sound/LanzamientoMartillo.mp3");
  sonido.play();
  setPosition($element, x, y);
}

//Movimiento de los lasers y eliminacion de los que salen de la pantalla

function updateLasers(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for(let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= 300 * dt;
    if(laser.y < -50) {
      destroyLaser($container, laser);
      lasers.splice(i, 1);
      i--;
    }
    setPosition(laser.$element, laser.x, laser.y);
    const enemies = GAME_STATE.enemies;
    for(let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      const rect1 = laser.$element.getBoundingClientRect();
      const rect2 = enemy.$element.getBoundingClientRect();
      if(rectsIntersect(rect1, rect2)) {
        destroyLaser($container, laser);
        destroyEnemy($container, enemy);
        let sonido = new Audio("sound/SonidoAcierto.mp3");
        sonido.play();
        lasers.splice(i, 1);
        enemies.splice(j, 1);
        i--;
        j--;
      }
    }
  }
}

//Funcion que destruye los lasers

function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

//Creacion de enemigos

function createEnemy($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/enemigo.png";
  $element.className = "enemy";
  $container.appendChild($element);
  const enemy = {
    x,
    y,
    cooldown: rand(2, ENEMY_COOLDOWN),
    $element
  };
  GAME_STATE.enemies.push(enemy);
  setPosition($element, x, y);
}

//Movimiento de los enemigos

function updateEnemies(dt, $container) {
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const enemies = GAME_STATE.enemies;
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);
    enemy.cooldown -= dt;
    if (enemy.cooldown <= 0) {
      createEnemyLaser($container, x, y);
      enemy.cooldown = ENEMY_COOLDOWN;
    }
  }
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}

//Funcion que destruye los enemigos

function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element);
  enemy.isDead = true;
}

//Creacion de los lasers de los enemigos

function createEnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/laser.png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.enemyLasers.push(laser);
  setPosition($element, x, y);
}

//Movimiento de los lasers de los enemigos y eliminacion de los que salen de la pantalla y destruccion del jugador si es tocado por uno

function updateEnemyLasers(dt, $container) {
  const lasers = GAME_STATE.enemyLasers;
  for(let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += 300 * dt;
    if(laser.y > GAME_HEIGHT + 50) {
      $container.removeChild(laser.$element);
      lasers.splice(i, 1);
      i--;
    }
    setPosition(laser.$element, laser.x, laser.y);
    const player = document.querySelector(".player");
    const rect1 = laser.$element.getBoundingClientRect();
    const rect2 = player.getBoundingClientRect();
    //Destruir el laser si toca al jugador y el jugador si toca el laser
    if(rectsIntersect(rect1, rect2)) {
      destroyLaser($container, laser);
      destroyPlayer($container, player);
      window.alert("Perdiste!");
      lasers.splice(i, 1);
      i--;
    }
    
    
  }
}

//Funcion que inicializa el juego

function init() {
  const $container = document.getElementsByClassName('game')[0];
  createPlayer($container);


  let sonido = new Audio("sound/Fondo.mp3");
  sonido.play();
  
  const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
  for (let j = 0; j < 3; j++) {
    const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
    for (let i = 0; i < ENEMIES_PER_ROW; i++) {
      const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
      createEnemy($container, x, y);
    }
  }
}

function playerHasWon() {
  return GAME_STATE.enemies.length === 0;
}


//Funcion que actualiza el juego permitiendo que se mueva la nave, los lasers y los enemigos

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  if (playerHasWon()) {
    window.alert("You win!");
    let sonido = new Audio("sound/win.mp3");
    sonido.play();
  }

  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

//Moviemiento de la nave con las flechas

function onKeyDown(e) {
  if(e.keyCode === 37 || e.keyCode === 65) { //Movimiento a la izquierda
    GAME_STATE.playerX -= 50;
    const $nave = document.getElementById("player");
    setPosition($nave, GAME_STATE.playerX, GAME_STATE.playerY);
  }else if (e.keyCode === 39 || e.keyCode === 68) { //Movimiento a la   derecha
    GAME_STATE.playerX += 50;
    const $nave = document.getElementById("player");
    setPosition($nave, GAME_STATE.playerX, GAME_STATE.playerY);
  }else if (e.keyCode === 32) { //Disparo laser
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === 32) {
    GAME_STATE.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);