

import firebase from "../../firebase";
import { signInWithGoogle, signOut } from "../../apis/Signin";

import { useAuthState } from "react-firebase-hooks/auth";
import logo from "./saarthi.png";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import "../../Pages/SearchPage/SearchPage.css"
import { useNavigate } from "react-router-dom";
const auth = firebase.auth();
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Notes', href: '/notes', current: true },
]
// const pvt = [
//   { name: 'Dashboard', href: '/dashboard', current: true },
//   // { name: user.name, href: '/', current: true },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Home() {
  const [userLoggedIn] = useAuthState(auth);


  return (
    userLoggedIn ? <Loggedin /> : <Loggedout />
  );
}

function Loggedin() {


  const user = firebase.auth().currentUser;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.photoURL}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >

        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to={"/dashboard"}
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Hii {user.displayName}!
              </Link>

            )}
          </Menu.Item>
          {/* {pvt.map((item) => ( */}

          <Menu.Item>
            {({ active }) => (
              <Link
                // to={item.href}
                to="/dashboard"

                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Dashboard  {/* {item.name} */}
              </Link>
            )}
          </Menu.Item>
          {/* ))} */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOut}
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>


  );
}
function Loggedout() {
  return (
    <button onClick={signInWithGoogle} className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 hover:text-white transition duration-300"
    >SignIn</button>
  );
}


export default function Example() {
  const navigate = useNavigate();
  const handleSubmit = async (termFromSearchBar) => {

    try {
      navigate('/search', { state: { search: termFromSearchBar } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="lg:mx-48 md:mx-16 mx:auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current ? 'text-white' : 'text-gray-300',
                          'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out  hover:bg-sky-500 hover:text-black focus:bg-gray-700 focus:text-white'
                        )}


                      >
                        {item.name}
                      </Link>
                    ))}
                    <div>
                      <SearchBar handleFormSubmit={handleSubmit} />
                    </div>

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Home />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current ? ' text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <SearchBar handleFormSubmit={handleSubmit} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
