import { Link } from "react-router-dom";
import { inStock} from '../store/actions/toy.actions'

export function ToyPreview({toy}){

    return(
        <article className="toyPreview">
            
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h4>InStock: {inStock(toy)}</h4>
            <hr />
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )

}