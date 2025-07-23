import { Link } from "react-router-dom";
import AboutPage from "./About";
import HomeNav from "./elements/nav/GettingStartedNav";

export default function Header() {
    
    return (
        <header>
            <nav className="main-nav">
                <div id="nav-logo">
                    <Link to={'/'}><h4 id="nav-logo">Locker</h4></Link>
                </div>
                <div>
                    <Link to={'/about'} element={<AboutPage />}>About Us</Link>
                </div>
            </nav>
            <HomeNav />
        </header>
    );
};