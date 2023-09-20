
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toys.service"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name toy"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
            </form>

        </section>
    )
}