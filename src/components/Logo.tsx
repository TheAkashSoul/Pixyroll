import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      Pixyroll
    </Link>
  );
};

export default Logo;
