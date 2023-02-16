import { Link } from "react-router-dom"

export default function Nav() {
  
    return (
    <header>
        <nav>
            <Link to="/">
              HOME
            </Link>
            <Link to="/News">
              NEWS
            </Link>
            <Link to="/Events">
              EVENTS
            </Link>
        </nav>
    </header>
  )
}