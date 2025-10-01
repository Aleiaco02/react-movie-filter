import { useState, useEffect } from 'react'

const filmsIniziali = [
    { title: 'Inception', genere: 'Fantascienza' },
    { title: 'Il Padrino', genere: 'Thriller' },
    { title: 'Titanic', genere: 'Romantico' },
    { title: 'Batman', genere: 'Azione' },
    { title: 'Interstellar', genere: 'Fantascienza' },
    { title: 'Pulp Fiction', genere: 'Thriller' },
]

const List = () => {
    const [film, setFilm] = useState(filmsIniziali)
    const [filteredFilm, setFilteredFilm] = useState(filmsIniziali)
    const [search, setSearch] = useState("")

    // Stati per il form
    const [newTitle, setNewTitle] = useState("")
    const [newGenere, setNewGenere] = useState("")

    // Filtraggio
    useEffect(() => {
        setFilteredFilm(
            film.filter(f => f.genere.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search, film])

    // Generi dinamici per il select
    // estraggo tutti i generi
    const tuttiGeneri = film.map(film => film.genere)
    // filtro i duplicati
    const generi = tuttiGeneri.filter((genere, index, array) => {
        return array.indexOf(genere) === index
    })

    // capitalizazzione parola per non far creare un nuovo genere se si mette la prima lettera minuscola
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    // Aggiungere un nuovo film
    const handleAddFilm = (e) => {
        e.preventDefault()
        if (newTitle && newGenere) {
            const nuovoFilm = { title: capitalize(newTitle), genere: capitalize(newGenere) }
            setFilm([...film, nuovoFilm])
            setNewTitle("")
            setNewGenere("")
        }
    }

    return (
        <>
            {/* Select per filtrare */}
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

            {/* Form per aggiungere film */}
            <div className="container my-3">
                <form className="row g-3" onSubmit={handleAddFilm}>
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Titolo film"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Genere"
                            value={newGenere}
                            onChange={(e) => setNewGenere(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Aggiungi</button>
                    </div>
                </form>
            </div>

            {/* Lista card */}
            <div className="container my-5">
                <div className="row border-primary row-cols-1 row-cols-md-3 g-5">
                    {filteredFilm.map((f, index) => (
                        <div key={index} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h3>{f.title}</h3>
                                    <p>{f.genere}</p>
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
