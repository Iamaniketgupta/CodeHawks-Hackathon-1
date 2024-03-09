import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({dark,setDark}) => {
    

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(dark));
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);
 

    return (
        <div className='sticky top-0 flex h-14 dark:bg-[#0e1012]  bg-white text-slate-800 items-center justify-between px-8 py-3'>
            <div className="font-bold text-xl min-w-fit">
                <Link to={"/"} className="dark:text-white text-slate-800 hover:text-inherit">
                Code Hawks
                </Link>
            </div>
            <nav className=" max-w-fit flex items-center justify-center gap-2 pl-4">
                <div>
                    {dark ? (
                        <CiLight size={25} className="cursor-pointer  text-yellow-300 shadow-lg font-bold" onClick={() => setDark(false)} title="Light Mode"/>
                    ) : (
                        <MdDarkMode size={25} className="cursor-pointer  hover:text-blue-700 dark:text-white text-slate-800" onClick={() => setDark(true)} title="Dark Mode"/>
                    )}
                </div>
                <Link to={"/api/login"} className=' min-w-fit p-2 px-4  hover:text-blue-500 cursor-pointer font-semibold text-sm rounded-3xl' >Log in</Link>
                <Link to={"/api/signup"} className='min-w-fit p-2 px-4  bg-blue-700 cursor-pointer hover:text-inherit text-white font-semibold text-sm rounded-3xl'>Sign up</Link>
            </nav>
        </div>
    );
}

export default Header;
