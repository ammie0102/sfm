import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUtensils,
    faUser,
    faTable,
    faTruck,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const links = [
    {
        icon: faHome,
        text: "Dashboard",
        route: "/dashboard",
    },
    {
        icon: faUtensils,
        text: "Food",
        route: "/food",
    },
    {
        icon: faUser,
        text: "Customer",
        route: "/customer",
    },
    {
        icon: faTable,
        text: "Order",
        route: "/order",
    },
    {
        icon: faTable,
        text: "Records",
        route: "/records",
    },
    {
        icon: faTruck,
        text: "Delivery",
        route: "/delivery",
    },
    {
        icon: faUser,
        text: "Riders",
        route: "/riders",
    },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-red-600">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                to={link.route}
                                className={`flex items-center p-2 text-white rounded-lg hover:bg-red-500 group ${
                                    location.pathname === link.route
                                        ? "bg-yellow-400"
                                        : ""
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className="flex-shrink-0 w-5 h-5 text-white transition duration-75"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    {link.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li
                        className="flex items-center p-2 text-white rounded-lg hover:bg-red-500 group"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faSignOut}
                            className="flex-shrink-0 w-5 h-5 text-white transition duration-75"
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
