import { Link } from "react-router-dom";
import { useUserStore } from "../../state/user.state";

const Navbar = () => {
  const { userId } = useUserStore();
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-center">
          <nav className="hidden gap-20 text-sm font-medium md:flex">
            <Link className="text-gray-500" to="/">
              Photos
            </Link>
            <Link className="text-gray-500" to="/posts">
              Posts
            </Link>
            <Link className="text-gray-500" to="/users">
              Users
            </Link>
            <Link className="text-gray-500" to={`/user/${userId}`}>
              My account
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
