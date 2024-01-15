import React from "react";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "../icons/LogoutIcon";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="pl-12 lg:pl-0 flex-none justify-between w-full gap-2">
        {/* <div className="flex-1 md:hidden">
          <a className="px-4 text-xl font-semibold tracking-wide">EasyMail</a>
        </div> */}
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full lg:w-1/2"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={
                  user.picture ||
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                alt="profile-picture"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-2 z-[1] p-2 menu menu-sm dropdown-content bg-base-200 rounded-box w-max gap-2"
          >
            <li>
              <a className="flex gap-2 items-center hover:rounded-box">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.picture ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      alt="profile-picture"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <a className="text-sm font-semibold">{user.name}</a>
                  <p className="text-xs font-light truncate ">{user.email}</p>
                </div>
              </a>
            </li>
            <li>
              <button type="button" onClick={logout} className="flex gap-2 items-center hover:rounded-box">
                {" "}
                <LogoutIcon className={"w-5 h-5"} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
