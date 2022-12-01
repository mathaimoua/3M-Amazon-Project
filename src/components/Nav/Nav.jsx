import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mmm from '../../assets/3m.png'
import {
  MenuIcon,
  XIcon,
  ArrowCircleLeftIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon,
  LocationMarkerIcon,
  ArchiveIcon,
  QuestionMarkCircleIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/solid";

function Nav() {
  const ref = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };
  const clickRef = () => {
    console.log(ref.current);
  };

  return (
    <div
      className="flex"
      onClick={() => {
        if (nav) {
          setNav(false);
        }
      }}
    >
      {/* NavBar */}
      <div
        className="w-screen h-[60px] z-50 bg-black text-white fixed border-b-0 border-zinc-400 md:ml-auto md:mr-auto"
        onClick={clickRef}
      >
        <div className=" flex w-screen justify-between p-3 lg:pt-2">
          <div className="items-center">
            <a href={"/"} >
              <h1 className="md:ml-2 text-2xl font-bold md:text-4xl transition duration:500 hover:scale-[102%]">
              <span className='flex'><img src={mmm} className="align-middle w-[10%] md:w-[8%] mr-2 md:mb-1" />
              {/* <span className='text-[#ff0000]'>3M</span>  */}
              Best Products Finder</span>
              </h1>
            </a>
          </div>
          <div className="md:hidden " onClick={handleClick}>
            {!nav ? <MenuIcon className="w-7" /> : <XIcon className="w-7" />}
          </div>
        </div>
        {/* Mobile NavMenu */}
      </div>
      <div className="md:hidden fixed z-40 w-full h-0">
        <ul
          className={`bg-zinc-300 w-full border-b-2 border-zinc-200 shadow-md ease-in-out duration-300 ${
            nav ? "translate-y-0 pt-[15%]" : "-translate-y-full"
          }`}
        >
          <li className="border-b-2 border-zinc-200 w-full flex justify-center transition ease-in-out duration-200 active:bg-zinc-500">
            <QuestionMarkCircleIcon className="w-6 mr-2" />
            <p className="mt-1 text-lg">About</p>
          </li>
          <li className="border-b-2 border-zinc-200 w-full flex justify-center transition ease-in-out duration-200 active:bg-zinc-500">
            <PhoneIcon className="w-6 mr-2" />
            <p className="mt-1 text-lg">Contact</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
