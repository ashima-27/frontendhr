import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dropdown = ({ heading, options, onSelect, isActive, setIsActive, dropName }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMenuToggle = () => {
    setIsActive(!isActive);
  };

  const handleMenuClose = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-container')) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedOption(item);
    onSelect(item);
    handleMenuClose();
  };

  return (
    <Menu as="div" className="relative inline-block text-left p-1 menu-container">
      <div>
        <Menu.Button 
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleMenuToggle}
        >
          {selectedOption ? selectedOption.name : dropName?.length > 0 ? dropName : "10"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      {isActive && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((item, index) => (
              <div className="py-1" key={index}>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                      onClick={() => handleSelect(item)}
                    >
                      {item.name}
                    </p>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default Dropdown;
