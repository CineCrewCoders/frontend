import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="flex justify-between px-4 py-8 bg-slate-400">
            <h1>Navbar</h1>
            <ul className="list-ul">
                <li className="list-li"><Link to='home'>Home</Link></li>
                <li className="list-li"><Link to='plan-to-watch'></Link></li>
                <li className="list-li"><Link to='watched'>Home</Link></li>
                <li className="list-li"><Link to='find-movie'>Home</Link></li>
            </ul>
        </nav>
    )
}
