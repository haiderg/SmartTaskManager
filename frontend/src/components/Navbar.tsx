import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-black flex text-white h-12 justify-between items-center font-bold p-7">
        <div className="flex gap-4">
          <Link to="/" className="text-white">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-white">
            Tasks
          </Link>
        </div>

        <div className="text-white absolute left-1/2 transform -translate-x-1/2">
          Smart Task Manager
        </div>

        <div></div>
      </nav>
    </>
  );
};

export default Navbar;
