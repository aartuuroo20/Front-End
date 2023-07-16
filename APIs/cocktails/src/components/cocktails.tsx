import { useEffect, useState } from "react"


const cocktails = () => {

    const [cocktails, setCocktails] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')

    const letters = "abcdefghijklmnopqrstuvwxyz".split('')
    const fetchCocktails = async () => {
        const cocktails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        const data = await cocktails.json()
        setCocktails(data.drinks)
    }

    useEffect(() => {
        fetchCocktails()
    }, [search])

    return (
        <>
        <h1>Cocktails</h1>

        <div>
            <input type="text" placeholder="Buscar cocktails" onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div>
            {
                letters.map((letter, index) => (
                    <button key={index} onClick={() => setSearch(letter)}>{letter}</button>
                ))
            }
        </div>

        <div>
            {
                cocktails && cocktails.map((cocktail, index) => (
                    <div>
                        {
                            cocktail && <h2>{cocktail.strDrink}</h2>
                        }    
                    </div>
                ))
            }
    
        </div>
        
        </>
    )

}

export default cocktails