import React, { useEffect, useState } from "react";
import useMailAPI from "../hooks/useMailApi";
import { useNavigate } from "react-router-dom";
import { InboxIcon } from "../icons/InboxIcon";
import { SentIcon } from "../icons/SentIcon";
import { MenuIcon } from "../icons/MenuIcon";
import Compose from "./Compose";

const Sidebar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("inbox");
  const { getRecievedEmails, getSentEmails } = useMailAPI();
  const sentEmails = async () => {
    setCurrent("sent");
    const res = await getSentEmails({ count: 10, offset: 0 });
    console.log("sent: ", res);
    navigate("/sent");
  };
  const inboxEmails = async () => {
    setCurrent("inbox");
    const res = await getRecievedEmails({ count: 10, offset: 0 });
    console.log("inbox: ", res);
    navigate("/inbox");
  };
  return (
    <div className="pr-2 h-full">
      <div className="drawer z-[2] bg-transparent lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content absolute top-2.5 left-2 flex items-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <MenuIcon className="inline-block w-5 h-5 stroke-current" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 py-2 w-80 min-h-full bg-base-200 text-base-content flex justify-start justify-items-start">
            <div className="p-3">
              <h2 className="text-2xl font-semibold tracking-wide">EasyMail</h2>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {/* <button className="btn btn-neutral btn-wide">Compose</button> */}
              <Compose />
              <ul className="space-y-1">
                <li>
                  <a
                    className={current === "inbox" && "active"}
                    onClick={inboxEmails}
                  >
                    <InboxIcon className="w-4" />
                    <span>Inbox</span>
                  </a>
                </li>
                <li>
                  <a
                    className={current === "sent" && "active"}
                    onClick={sentEmails}
                  >
                    <SentIcon className="w-4" />
                    <span>Sent</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
