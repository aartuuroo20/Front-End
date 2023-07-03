var page = "2";
function fetchChars(page){
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(data => data.json())
    .then(chars => {
        var container = document.getElementById("results");
        container.innerHTML = "";
        for(var char of chars.results){
            var div = document.createElement("div");
            div.innerHTML = `
                <img src="${char.image}" alt="${char.name}">
                <h3>${char.name}</h3>
            `;
            container.appendChild(div);
        }});
}

function fetchCharsByName(nombre){
    var nombre = document.getElementById("textoNombre").value;
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
    .then(data => data.json())
    .then(chars => {
        var container = document.getElementById("results");
        container.innerHTML = "";
        for(var char of chars.results){
            var div = document.createElement("div");
            div.innerHTML = `
                <img src="${char.image}" alt="${char.name}">
                <h3>${char.name}</h3>
            `;
            container.appendChild(div);
        }});
}

