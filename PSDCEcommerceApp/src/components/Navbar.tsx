import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <nav className="flex flex-wrap items-center justify-evenly bg-gray-600 px-6 py-3">
                <div className="mr-6 flex flex-shrink-0 items-center text-white hover:cursor-pointer">
                    <img
                        className="mx-auto h-14 w-auto"
                        src="https://baitussalam.org/images/logo.svg"
                        alt="Baitussalam"
                    />
                </div>
                <div  className="block lg:hidden">
                    <button className="flex items-center rounded border border-gray-500 px-3 py-2 text-gray-400 hover:border-white hover:text-white">
                        <svg
                            className="h-3 w-3 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
                    <div className="text-sm lg:flex-grow">
                        <Link
                            to="/"
                            className="mr-4 mt-4 block text-gray-300 hover:text-white lg:mt-0 lg:inline-block"
                        >
                            Home
                        </Link>
                        <Link
                            to="#"
                            className="mr-4 mt-4 block text-gray-300 hover:text-white lg:mt-0 lg:inline-block"
                        >
                            About
                        </Link>
                        <a
                            href="#"
                            className="mr-4 mt-4 block text-gray-300 hover:text-white lg:mt-0 lg:inline-block"
                        >
                            Products
                        </a>
                        <a
                            href="#"
                            className="mt-4 mr-4 block text-gray-300 hover:text-white lg:mt-0 lg:inline-block"
                        >
                            Blog
                        </a>
                        <a
                            href="#"
                            className="mt-4 block text-gray-300 hover:text-white lg:mt-0 lg:inline-block"
                        >
                            Contact
                        </a>
                    </div>
                    <div>
                        {isLoggedIn && (
                            <button onClick={handleLogout} className="mt-4 inline-block rounded border border-gray-400 px-4 py-2 text-sm leading-none text-gray-300 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-800 lg:mt-0">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
