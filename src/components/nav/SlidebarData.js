import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as SlIcons from "react-icons/sl";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: <FaIcons.FaUserTie />,
    cName: "nav-text"
  },
  {
    title: "Resumes",
    path: "/resumes",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Cover Letters",
    path: "/coverletters",
    icon: <SlIcons.SlEnvolopeLetter />,
    cName: "nav-text"
  },
  {
    title: "Interviews",
    path: "/interviews",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text"
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text"
  },
  {
    title: "Log Out",
    path: "/login",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text"
  }
];
