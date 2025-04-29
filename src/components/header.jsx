import "../styles/header.css";
import menu from "../assets/menu.svg";


function Header() {

    function handleClick() {
        const nav = document.querySelector(".header-menu");
        nav.classList.toggle("show");
    };


    return (
        <header>
            <p>Resume Builder</p>
            <button className="menu-btn" onClick={handleClick}><img src={menu} alt="#"/></button>
            <nav className="header-nav">
                <a href="#">Templates</a>
                <a href="#">AI Assistance</a>
                <a href="#">Support</a>
            </nav>
            <nav className="header-menu">
                <a href="#">Templates</a>
                <a href="#">AI Assistance</a>
                <a href="#">Support</a>
            </nav>
        </header>
    );
};


export default Header;