import { SignIn, SignOut } from "phosphor-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Head() {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  return (
    <div className="flex h-16 py-4 justify-between items-center self-stretch mx-auto px-4 w-full md:px-0 md:w-4/5">
      <div className="flex w-8 h-[26px] items-center gap-4">
        <Link to="/home"><img src="logo.png" className="w-32 rounded-t-sm"></img></Link>
      </div>
      <div className="absolute hidden md:flex right-1/2 items-center gap-8 italic cursor-pointer tracking-wider translate-x-1/2">
        <Link to="/home">Home</Link>
        <Link to="/feed/recent">Recentes</Link>
        <Link to="/user">Perfil</Link>
      </div>
        {authenticated ? (
          <div className="flex flex-row gap-4 items-center">
            <span className="hidden md:inline italic font-light">
              Olá! Elon Musk
            </span>
            <button
              data-tooltip-id="tooltip-controller"
              data-tooltip-content="Logout!"
              onClick={handleLogout}
              className="group relative flex w-8 h-8 items-center justify-center gap-4 bg-silver-chalice-400 rounded-full overflow-hidden cursor-pointer"
            >
              <img className="filter group-hover:brightness-50" src="https://avatars.githubusercontent.com/u/32042329?v=4" />
              <SignOut className="absolute text-serenade-50 hidden group-hover:inline" weight="bold" size={18}></SignOut>
              {/* <User size={32}></User> */}
            </button>
          </div>
        ) : (
          <div onClick={() => navigate("/login")} className="flex flex-row gap-2 items-center cursor-pointer">
            <span className="hidden md:inline italic font-thin">
              Entrar
            </span>
            <SignIn size={24} weight="bold"></SignIn>
          </div>
        )}
    </div>
  );
}
