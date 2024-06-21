import React from 'react';
import user from '../assets/images/user_3177440.png';

const SideCard = ({ desc, count, backgroundColor }) => {
  return (
    <div
      className="flex flex-row items-center border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      style={{ backgroundColor: backgroundColor || "white" }}
    >
      <img
        className="object-cover p-4 rounded-t-lg h-32 md:h-auto md:w-24 md:rounded-none md:rounded-l-lg"
        src={user}
        alt="Total Employee"
      />
      <div className="flex flex-col justify-between p-4 leading-normal text-black">
        <h6 className="mb-2 text-xl font-bold tracking-tight">
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
