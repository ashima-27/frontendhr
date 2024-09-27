import React from 'react';
import user from '../assets/images/user_3177440.png';

const SideCard = ({ desc, count, backgroundColor }) => {
  return (
    <div
      className="w-full mx-auto justify-center items-center flex flex-col sm:flex-row items-center border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      style={{ backgroundColor: backgroundColor || "white" }}
    >
      <img
        className="object-contain p-4 rounded-t-lg sm:h-20 lg:h-20 md:h-32 md:h-20 md:w-20 lg:w-20 md:rounded-none md:rounded-l-lg "
        src={user}
        alt="Total Employee"
      />
      <div className="flex flex-col justify-between p-4 leading-normal text-black">
        <h6 className="mb-2 text-sm sm:text-md md:text-xl font-bold tracking-tight">
          {desc}
        </h6>
        <p className="mb-3 font-normal">
          {count}
        </p>
      </div>
    </div>
  );
};

export default SideCard;
