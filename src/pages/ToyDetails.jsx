import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toys.service"
import { showErrorMsg } from "../services/event-bus.service"
import { inStock} from '../store/actions/toy.actions'
export function ToyDetails(){
    const [toy,setToy]=useState(null)
    const {toyId}=useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return(
        <section className="ToyDetails">
           <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>In Stock:{inStock(toy)}</p>
            <p>Labels:{toy. labels}</p>
            <p>Created At: {new Date(toy.createdAt).toLocaleString()}</p>
            <Link to="/toy">Back</Link>
        </section>
    )
}