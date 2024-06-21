import React from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import Cookies from "js-cookie";
function MenuBar({currentRouteName,toggleSidebar,isSidebarVisible}) {
    const name = Cookies.get("userName");
  return (

    <header className={` bg-white shadow-md p-4 flex flex-row items-center justify-between fixed top-0  right-0 z-50  ${isSidebarVisible ? "lg:w-full lg:ml-20" :"lg:w-11/12 lg:ml-10 "}`}>
      <div className={`flex flex-row items-center lg:order-1 w-50  ${isSidebarVisible ? "lg:ml-60 lg:pl-2" :""}`}>
        <button onClick={toggleSidebar} className="focus:outline-none flex flex-row justify-between gap-2">
          <MenuIcon className="h-6 w-6 text-blue-900" />
          <span className="text-lg font-semibold text-black-900">Welcome {name}</span>
        </button>
      </div>
      <div className="flex lg:order-2">
        <span className="text-lg font-semibold text-black-900">{currentRouteName}</span>
      </div>
    </header>
  );
};



export default MenuBar;
