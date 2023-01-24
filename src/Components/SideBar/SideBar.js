import { NavLink } from "react-router-dom";
import { FaAddressBook, FaBars, FaBell, FaBoxOpen, FaGift, FaGear, FaHome, FaIndustry, FaLock, FaMoneyBill, FaServicestack, FaUser, FaWrench, FaCalendar } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiBook, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import SidebarMenu from "./SidebarMenu";
import "./SideBar.scss";
import { FAEBookingCard } from "@plexaar/components/dist/stories/FAEBookingCard/FAEBookingCard";
import { FAEGuardedRoute } from "@findanexpert-fae/components/dist/stories/FAEGuardedRoute/FAEGuardedRoute";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";


const routes = [
  {
    path: "/",
    name: "Dashboard",
    // icon: <FaHome />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Dashboard.png")} alt={"logo"} />

  },
  {
    path: "/industries" ,
    name: "Industries",
    // icon: <FaIndustry/>,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Industries.png")} alt={"logo"} />

  },
  {
    path: "/services",
    name: "Services",
    // icon: <FaServicestack />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Services.png")} alt={"logo"} />

  },
  {
    path:  "/service-provider",
    name: "Service Provider",
    // icon: <FaBoxOpen />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Provider.png")} alt={"logo"} />

  },
  {
    path: "/customers",
    name: "Customers",
    // icon: <FaUser />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Customer.png")} alt={"logo"} />

    // subRoutes: [
    //   {
    //     path: "/settings/profile",
    //     name: "Profile ",
    //     icon: <FaUser />,
    //   },
    //   {
    //     path: "/settings/2fa",
    //     name: "2FA",
    //     icon: <FaLock />,
    //   },
    //   {
    //     path: "/settings/billing",
    //     name: "Billing",
    //     icon: <FaMoneyBill />,
    //   },
    // ],
  },
  {
    path:"/booking-calendar",
    name: "Booking Calender",
    // icon: <FaCalendar />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Calendar.png")} alt={"logo"} />

  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Bookings.png")} alt={"logo"} />,//<BiBook />,
    exact: true,
    // subRoutes: [
    //   {
    //     path: "/settings/profile",
    //     name: "Profile ",
    //     icon: <FaUser />,
    //   },
    //   {
    //     path: "/settings/2fa",
    //     name: "2FA",
    //     icon: <FaLock />,
    //   },
    //   {
    //     path: "/settings/billing",
    //     name: "Billing",
    //     icon: <FaMoneyBill />,
    //   },
    // ],
  },
  {
    path: "/vouchers",
    name: "Vouchers",
    // icon: <FaGift/>,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Vouchers.png")} alt={"logo"} />

  },

  {
    path: "/admin-users",
    name: "Admin Users",
    // icon: <FaUser />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Admin.png")} alt={"logo"} />

  },

  {
    path:  "/push-notification",
    name: "Push Notification",
    // icon: <FaBell />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Offer.png")} alt={"logo"} />

  },

  {
    path:"/role-listing" ,
    name: "Roles",
    // icon: <FaAddressBook />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Partners.png")} alt={"logo"} />

  },

  {
    path:"/discount-codes" ,
    name: "Discount Codes",
    // icon: <FaAddressBook />,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Discount.png")} alt={"logo"} />

  },

  {
    path: "/setting",
    name: "Settings",
    // icon: <SettingsOutlinedIcon/>,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Settings.png")} alt={"logo"} />

  },

  {
    path: "/users",
    name: "Users",
    // icon: <SettingsOutlinedIcon/>,
    icon: <img  height={18} width = {18}  src={getImageOrVideoSrcFromPublicFolder("Customer.png")} alt={"logo"} />

  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const expand = () => setIsOpen(true);
  const collapse = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
        //  onClick={toggle}
         onMouseOver = {expand}
         onMouseLeave = {collapse}
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 14,
            },
          }}
          className={`sidebar `}
        >
          {/* <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div> */}
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              // if (route.subRoutes) {
              //   return (
              //     <SidebarMenu
              //       setIsOpen={setIsOpen}
              //       route={route}
              //       showAnimation={showAnimation}
              //       isOpen={isOpen}
              //     />
              //   );
              // }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
