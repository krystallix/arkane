import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 text-center text-gray-500 text-sm mt-10">
      <span>
        &copy; {new Date().getFullYear()} Arkane. Designed by Aji. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
