import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaChartLine, FaCog, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const menuRef = useRef(null);
  const borderRef = useRef(null);

  const menuItems = [
    { title: "Home", path: "/stockseer", icon: <FaHome /> },
    { title: "Profile", path: "/stockseer/profile", icon: <FaUser /> },
    { title: "Dashboard", path: "/stockseer/test", icon: <FaChartLine /> },
    { title: "Analytics", path: "/stockseer/analytics", icon: <FaChartBar /> },
    { title: "Settings", path: "/stockseer/settings", icon: <FaCog /> },
  ];

  const offsetMenuBorder = (element) => {
    if (!element || !menuRef.current || !borderRef.current) return;

    const offsetActiveItem = element.getBoundingClientRect();
    const menuTop = menuRef.current.getBoundingClientRect().top;
    const top = Math.floor(
      offsetActiveItem.top -
        menuTop -
        (borderRef.current.offsetHeight - offsetActiveItem.height) / 2
    );
    borderRef.current.style.transform = `translate3d(0, ${top}px, 0)`;
  };

  useEffect(() => {
    const activeItem = menuRef.current?.querySelector(".active");
    if (activeItem) {
      offsetMenuBorder(activeItem);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const activeItem = menuRef.current?.querySelector(".active");
      if (activeItem) {
        offsetMenuBorder(activeItem);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 z-50">
      <div
        ref={menuRef}
        className="relative flex flex-col items-center py-3 px-2 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg"
        style={{ height: "fit-content", minWidth: "48px" }}
      >
        {/* Sliding border */}
        <div
          ref={borderRef}
          className="absolute w-8 h-8 bg-blue-500/10 transition-transform duration-500 ease-out"
          style={{
            borderRadius: "8px",
            transformOrigin: "center",
          }}
        />

        {/* Menu Items */}
        <nav className="relative flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`group relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ease-out ${
                location.pathname === item.path
                  ? "active text-white scale-125"
                  : "text-gray-400 hover:text-gray-200 hover:scale-110"
              }`}
            >
              <span className="text-lg">{item.icon}</span>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.title}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
