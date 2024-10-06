import { Link, useLocation } from "react-router-dom";

const Header = () => {

  const location = useLocation();

  return (
    <>
      <header className="bg-blue-950 h-24 ">
        <div className="justify-center flex space-x-10 items-center w-full h-full text-center">
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="text-white text-lg w-24 transition ease-in-out delay-150 hover:text-zinc-200 duration-300 drop-shadow-xl"
            >
              Home
            </Link>
          )}
          <Link
            to="/dashboards"
            className="text-white text-lg w-24 transition ease-in-out delay-150 hover:text-zinc-200 duration-300 drop-shadow-xl"
          >
            Dashboards
          </Link>
          
          <Link
            to="/charts"
            className="text-white text-lg w-24 transition ease-in-out delay-150 hover:text-zinc-200 duration-300 drop-shadow-xl"
          >
            Transactions
          </Link>
          
        </div>
      </header>
    </>
  );
};

export default Header;
