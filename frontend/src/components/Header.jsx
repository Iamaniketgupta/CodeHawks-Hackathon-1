import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/user.data.fetch";
import { login , logout} from "../store/authSlice";

const Header = ({ dark, setDark }) => {
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const logoutResult = await logoutUser();
    if (logoutResult) {
      dispatch(logout());
      navigate('/api/login');
    }
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className='sticky top-0 z-50 flex h-14 dark:bg-[#0e1012] bg-white text-slate-800 items-center justify-between px-5 py-3'>
      <div className="font-bold text-xl max-sm:text-md min-w-fit">
        <Link to={"/"} className="dark:text-white  text-slate-800 hover:text-inherit">
          Code Hawks
        </Link>
      </div>
      <nav className="max-w-fit flex items-center justify-center gap-2 pl-4">
        <div>
          {dark ? (
            <CiLight size={25} className="cursor-pointer text-yellow-300 shadow-lg font-bold max-sm:text-xs" onClick={() => setDark(false)} title="Light Mode" />
          ) : (
            <MdDarkMode size={25} className="cursor-pointer hover:text-blue-700 dark:text-white text-slate-800 max-sm:text-xs" onClick={() => setDark(true)} title="Dark Mode" />
          )}
        </div>
        {!status ? (
          <>
            <Link to={"/api/login"} className='min-w-fit p-2 px-4 hover:text-blue-500 cursor-pointer font-semibold text-sm rounded-3xl'>Log in</Link>
            <Link to={"/api/signup"} className='min-w-fit p-2 px-4 bg-blue-700 cursor-pointer hover:text-inherit text-white font-semibold text-sm rounded-3xl'>Sign up</Link>
          </>
        ) : (
          <>
            <Link to={"/api/dashboard"} className='min-w-fit p-2 px-4 bg-blue-500  hover:text-white hover:bg-blue-700 text-white cursor-pointer font-semibold max-sm:text-xs text-sm rounded-3xl'>Dashboard</Link>
            <div onClick={logoutHandler} className='min-w-fit p-2 px-4 bg-blue-500  hover:bg-blue-700  text-white cursor-pointer font-semibold text-sm max-sm:text-xs rounded-3xl'>Log Out</div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
