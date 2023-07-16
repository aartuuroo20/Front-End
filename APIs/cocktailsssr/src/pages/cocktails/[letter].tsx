import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const letter = context.params?.letter
    const cocktails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    const data = await cocktails.json()

    return {
        props: {
            cocktails: data.drinks,
            letter: letter
        }
    }
}

const Letter = (props: any) => {
    return (
        <div>
            <h1>Cocktails starting with {props.letter}</h1>

            <div>
                {
                    props.cocktails.map((cocktail: any) => (
                        <div key={cocktail.idDrink}>
                            <p>{cocktail.strDrink}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Letter