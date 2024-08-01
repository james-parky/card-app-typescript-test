import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex flex-col justify-center gap-3 p-3 sm:flex-row">
      <NavLink
        className="p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white text-center"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white text-center"
        to={"/create"}
      >
        New Entry
      </NavLink>
    </nav>
  );
}
