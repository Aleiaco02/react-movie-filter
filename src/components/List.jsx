import { useState, useEffect } from 'react'

const films = [
    { title: 'Inception', genere: 'Fantascienza' },
    { title: 'Il Padrino', genere: 'Thriller' },
    { title: 'Titanic', genere: 'Romantico' },
    { title: 'Batman', genere: 'Azione' },
    { title: 'Interstellar', genere: 'Fantascienza' },
    { title: 'Pulp Fiction', genere: 'Thriller' },
]

const List = () => {
    const [film, setFilm] = useState(films)
    const [filteredFilm, setFilteredFilm] = useState(films)
    const [search, setSearch] = useState("")

    // estraggo i generi per rendere il filtro dinamico
    const tuttiGeneri = films.map(film => film.genere)

    // finltro i duplicati
    const generi = tuttiGeneri.filter((genere, index, array) => {
        return array.indexOf(genere) === index
    })



    useEffect(() => {
        setFilteredFilm(
            film.filter(f => f.genere.includes(search))
        )
    }, [search, film])

    return (
        <>
            <div className="container-fuild mx-5">
                <div className="row d-flex justify-content-end">
                    <div className="col-auto">
                        <select
                            className="form-select"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        >
                            <option value="">Filtra in base al genere</option>
                            {generi.map((genere, index) => (
                                <option key={index} value={genere}>{genere}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <div className="row border-primary row-cols-1 row-cols-md-3 g-5">
                    {filteredFilm.map((film, index) => (
                        <div key={index} className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>{film.title}</h3>
                                    <p>{film.genere}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default List
