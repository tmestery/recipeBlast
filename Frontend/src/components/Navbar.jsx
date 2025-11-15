import {Link} from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar(){
    return(
        <>
        <ul className="h-navbar">
            <li className="h-navbar-element">
                
            </li>
            <li className="h-navbar-element">
                
                <Link className="h-navbar-element-link" to="/">Home</Link>
            </li>
            <li className="h-navbar-element">

                <Link className="h-navbar-element-link" to="/history">History</Link>
            </li>
            <li className="h-navbar-element">

                <Link className="h-navbar-element-link" to="/profile">Profile</Link>
            </li>
        </ul>
        </>
    )
}