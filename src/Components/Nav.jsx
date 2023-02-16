import { Link } from "react-router-dom"

export default function Nav() {
  
    return (
    <header>
        <nav>
            <Link to="/">
              HOME
            </Link>
            <Link to="/News">
              PROJECTS
            </Link>
            <Link to="/Events">
              CONTACT
            </Link>
        </nav>
    </header>
  )
}