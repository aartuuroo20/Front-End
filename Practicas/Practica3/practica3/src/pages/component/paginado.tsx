import { Botones, Principal, Headers } from "@/styles/styledcomponents";
import Link from "next/link";

  type PageProps = {
    next: string | null,
    previous: string | null,
    planets: {
      name: string, 
      url: string
    }[]
  }

  const nextPage = (props: string | null) => {
    let page = window.location.pathname.split("/")[2];
    if(props === null) return alert("No hay mas paginas siguientes");
    let newpage = parseInt(page) + 1;
    window.location.href = `http://localhost:3000/planets/${newpage}`;
  }

  const prevPage = (props: string | null) => {
    let page = window.location.pathname.split("/")[2];
    if(props === null) return alert("No hay mas paginas anteriores");
    let newpage = parseInt(page) - 1;
    window.location.href = `http://localhost:3000/planets/${newpage}`;
  }

  const Paginado = (planets: PageProps) => {
    return (
        <Principal>
          <Headers>Listado de Planetas</Headers>
          <div>
            {
              planets.planets.map(planet => (
                <>
                  <li>
                    <Link className="planeta" href={`/planet/${planet.url}`}>{planet.name}</Link><br />
                  </li>
                </>
              ))
            }
          </div>
          
          <div>
            <Botones onClick={() => prevPage(planets.previous)}>Anterior</Botones>
            <Botones onClick={() => nextPage(planets.next)}>Siguiente</Botones> 
          </div>

        </Principal>
      )

  }

    export default Paginado