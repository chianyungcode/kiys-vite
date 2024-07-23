import { Link } from "@tanstack/react-router";
import { CircleUserRound, Search } from "lucide-react";

import PopoverCart from "./popover-cart";

const Navbar = () => {
  return (
    <header className="w-full font-sora max-w-screen-xl h-20 bg-white mx-auto px-8 flex items-center justify-between top-0 z-50 sticky">
      <Link
        to="/"
        className="font-sora flex gap-x-2 items-center font-semibold text-xl"
      >
        <img src="/logo.svg" alt="Logo" />
        Kiys
      </Link>
      <nav className="flex gap-x-2">
        <ul className="flex gap-x-8 font-sora font-medium">
          <Link to="/products">All Products</Link>
          <Link to="/keyboards">Keyboard</Link>
          <Link to="/mouse">Mouse</Link>
          <Link to="/headphone">Headphone</Link>
          <Link to="/accessories">Accessories</Link>
        </ul>
      </nav>
      <div className="flex gap-x-4">
        <Search />
        <PopoverCart />
        <Link to="/profile">
          <CircleUserRound />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
