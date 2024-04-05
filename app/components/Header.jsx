"use client";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-notactuallybrown to-notactuallybrown py-2">
      <ul className=" bg-bitterbrown pt-2 flex justify-between items-center">
        <li className="ml-14">
          <Link legacyBehavior href="/">
          <a className="text-milkbrown font-bold">❤️Home</a>
          </Link>
        </li>

        {/* COMMUNITY FILMS (Centered) */}
        <li className="text-center flex-1"> {/* flex-1 to make it take up remaining space */}
          <Link legacyBehavior href="/films">
            <a className=" text-milkbrown text-6xl font-semibold" style={{ fontFamily: 'Workbench, sans-serif' }}>
              <h1 className="inline">Leo's List</h1>
            </a>
          </Link>
        </li>
        {/* Home (Right-aligned) */}
        <li className="mr-14">
          <Link legacyBehavior href="/about">
          <a className="text-milkbrown font-bold">About ❤️</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;