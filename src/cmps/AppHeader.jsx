import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader(){
    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    return(
        <header className="app-header">
        <nav>
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/toy">Toys</NavLink> |
            <NavLink to="/about">About</NavLink> |

        </nav>

    </header>
    )
}