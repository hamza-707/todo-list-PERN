import { useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
  };
  return (
    <nav className="sticky w-full flex items-center justify-between py-4 bg-gray-100 text-gray-500 shadow-lg navbar navbar-light">
      <p className=" text-2xl ml-5">TODO LIST</p>
      <div className="flex w-auto justify-end items-center">
        <a
          href={`/home/${user_id}`}
          className="hover:text-gray-700 focus:text-gray-700 mx-5"
        >
          Home
        </a>
        <a
          href={`/report/${user_id}`}
          className="hover:text-gray-700 focus:text-gray-700 mx-5"
        >
          Reports
        </a>
        <button
          onClick={logoutHandler}
          className="hover:text-gray-700 focus:text-gray-700 bg-transparent border-2 border-slate-500 py-2 px-5 mx-5 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
