import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navigation() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <Link className="nav-link" to="/bookdetails">Book Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-login">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;
