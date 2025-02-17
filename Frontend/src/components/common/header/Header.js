import { useState, useContext } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import userAuthenticatedAxiosInstance from "../../../services/users/userAuthenticatedAxiosInstance";
import lionlogo from "../../../assets/lionsymbol.png"
const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
        const response = await userAuthenticatedAxiosInstance.post("/logout")
        console.log(response)
        console.log("User logged out successfully")
        } catch (error) {
        console.error("An error occurred", error.message)
        } finally {
        localStorage.removeItem("accessToken")
        setIsUserLoggedIn(false)
        navigate("/")
        console.log("User logged out unsuccessfully")
        }
    }

    return (
        <header className="bg-[#74B83E] h-20 flex items-center justify-between gap-4 px-8 w-full">
        <Link className="pt-1 flex items-center" to="/">
            <img src={lionlogo} alt="logo" className="w-16 hidden sm:block"/>
            <h1 className="text-white text-3xl font-bold">SchemeSeva</h1>
        </Link>
        <nav className="hidden md:flex space-x-4">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/schemes">Schemes</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="flex gap-4 items-center">
            <Link
            to={isUserLoggedIn ? "#" : "/login"}
            className="bg-white text-black rounded-md px-4 py-2 flex justify-center items-center cursor-pointer"
            onClick={isUserLoggedIn ? handleLogout : null}
            >
            <p>{isUserLoggedIn ? "Logout" : "Login"}</p>
            </Link>
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
        {isOpen && (
            <div className="absolute top-20 left-0 right-0 min-h-screen bg-[#74B83E] md:hidden">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/schemes">Schemes</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            </div>
        )}
        </header>
    )
    }

    const NavLink = ({ to, children }) => (
    <Link to={to} className="text-white hover:text-green-200 block py-2 md:inline md:py-0">
        {children}
    </Link>
)

export default Header

