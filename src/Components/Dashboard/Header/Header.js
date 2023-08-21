import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Auth/AuthContext/AuthContext';
import user_img from './Resources/man.png'
import icon from './Resources/icon.png'

function Header() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleNavbarToggle = () => {
        const navbar = document.getElementById('navbarNavDropdown');
        if (navbar) {
            navbar.classList.toggle('show');
        }
    };

    return (
        <header class="p-3 text-bg-dark sticky-top">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-between">

                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/index" class="navbar-brand mb-0 h1"><img src={icon} style={{ width: '45px', height: '30px' }} /></Link>
                        <Link to="/index" class="navbar-brand mb-0 h1">Garden Grove</Link>
                        <button 
                            class="navbar-toggler" 
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" 
                            aria-controls="navbarNavDropdown" 
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={handleNavbarToggle}
                            >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <span style={{ width: 60 }}></span>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav" >
                                <li class="nav-item"><Link to="/index" class="nav-link text-white">Home</Link></li>
                                <li class="nav-item dropdown">
                                    <Link to="/shop" class="nav-link text-white dropdown-toggle">Shop</Link>
                                    <div class="dropdown-menu dropdown-menu-dark">
                                        <Link to="/shop" class="dropdown-item">Shop</Link>
                                        <Link to="/cart" class="dropdown-item">Cart</Link>
                                        <Link to="/checkout" class="dropdown-item">Checkout</Link>
                                    </div>
                                </li>
                                <li class="nav-item"><Link to="/find" class="nav-link text-white">Find</Link></li>
                                <li class="nav-item"><Link to="/membership" class="nav-link text-white">Membership</Link></li>
                                <li class="nav-item"><Link to="/contact" class="nav-link text-white">Contact</Link></li>
                            </ul>
                        </div>
                    </nav>


                    {user ? (
                        <ul class="nav col-auto">
                            <li class="nav-item" style={{ marginRight: '20px' }}>
                                <Link to="/profile" style={{
                                    display: 'inline-block',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: 'yellow',
                                    textAlign: 'center',
                                    lineHeight: '35px',
                                    overflow: 'hidden',
                                    transition: 'background-color 0.3s ease'
                                }}>
                                    <img src={user_img} style={{
                                        border: '3px',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }} />
                                </Link>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="btn btn-outline-warning me-2"
                                    onClick={() => {
                                        logout();
                                        navigate('/login');
                                    }}
                                >Logout</button>
                            </li>
                        </ul>
                    ) : (
                        <ul class="nav col-auto">
                            <li class="nav-item">
                                <button type="button" class="btn btn-outline-light me-2"
                                    onClick={() => navigate("/login")}
                                >Login</button>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="btn btn-warning"
                                    onClick={() => navigate("/register")}
                                >Sign-up</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
