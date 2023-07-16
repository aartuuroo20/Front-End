import { get } from "http"
import { useEffect, useState } from "react"

type Book = {
    title: string,
    cover_i?: number,
    author_name?: string[],
    first_publish_year?: number,
    id_amazon?: string[],
}

const Libros = () => {

    const [book, setBook] = useState<string>('')
    const [books, setBooks] = useState<Book[]>([])
    const [pages, setPages] = useState<number>(0)

    const getBooks = async (page: number) => {
        const books = await fetch(`http://openlibrary.org/search.json?q=${book}&page=${page}`)
        const data = await books.json()
        setPages(data.numFound / 16)
        setBooks(data.docs)
    }

    useEffect(() => {
        getBooks(1)
    }, [book])


    return (
        <div>
            <h1>Libros</h1>

            <div>
                <input type="text" placeholder="Introduce libro" onChange={(e) => setBook(e.target.value)}/>
            </div>

            <div className="columnado">
                    {books.map((book, index) => (
                        <div key={index}>
                            <div>
                                {book.cover_i && <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />}
                            </div>
                            <div>
                                <h2>{book.title}</h2>
                                <p>{book.author_name && book.author_name.join(', ')}</p>
                                <p>{book.first_publish_year}</p>
                                <p>{book.id_amazon && book.id_amazon[0] !== "" && (
                                    <a href={`https://www.amazon.com/dp/${book.id_amazon[0]}`}>Comprar</a>
                                )}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )

}

export default Libros