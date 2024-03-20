import { SignIn, SignOut } from "phosphor-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Logo } from "../../atoms/Logo/Logo";

export function Header() {
  const { user, authenticated, logout } = useContext(AuthContext);
  const linkUser = `/user/${user?.name}`;

  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  return (
    <div className="flex h-16 py-4 justify-between items-center self-stretch mx-auto px-4 w-full md:px-0 md:w-4/5">
      <div className="flex w-8 h-[26px] items-center gap-4">
        <Logo isLink></Logo>
      </div>
      <div className="absolute hidden md:flex right-1/2 items-center gap-8 italic cursor-pointer tracking-wider translate-x-1/2">
        <Link to="/home">Home</Link>
        <Link to="/feed/recent">Recentes</Link>
        {authenticated && <Link to={linkUser}>Perfil</Link>}
      </div>
        {authenticated ? (
          <div className="flex flex-row gap-4 items-center">
            <span className="hidden md:inline italic font-light">
              Olá! {user!.name}
            </span>
            <button
              data-tooltip-id="tooltip-controller"
              data-tooltip-content="Logout!"
              onClick={handleLogout}
              className="group relative flex w-8 h-8 items-center justify-center gap-4 bg-silver-chalice-400 rounded-full overflow-hidden cursor-pointer"
            >
              <img className="filter group-hover:brightness-50" src={user!.avatarUrl} />
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
