import { GetServerSideProps } from "next"




const Cockatails = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

    return (
        <div>
            <h1>Cocktails</h1>

            <div>
                {
                    letters.map((letter: string) => (
                        <a href={`/cocktails/${letter}`} key={letter}>{letter}</a>
                    ))
                }
            </div>
        </div>
    )
}

export default Cockatails