import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'
import { toyService } from '../services/toys.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys,removeToy,removeToyOptimistic,saveToy} from '../store/actions/toy.actions'
import { ADD_TOY_TO_CART,SET_FILTER_BY,ADD_TOY} from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'

export function ToyIndex(){
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
 

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove ')
            })
    }
    
    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveCar(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }






    return(
        <section className="toyIndex">
            <h3>Toys Shop</h3>
            <main>
                <button onClick={onAddToy}>Add Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                    // addToCart={addToCart}
                />
                }

                {isLoading && <div>Loading...</div>}
                <hr />
            </main>
        </section>
    )
}