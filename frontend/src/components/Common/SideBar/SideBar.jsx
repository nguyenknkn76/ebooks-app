import React from "react";
import "./SideBar.scss";

const SideBar = () => {
  const menuItems = [
    {
      title: "MAIN",
      items: [{ name: "Dashboard", icon: "grid" }],
    },
    {
      title: "LISTS",
      items: [
        { name: "Users", icon: "user" },
        { name: "Voices", icon: "store" },
        { name: "Books", icon: "book" },
        { name: "Delivery", icon: "truck" },
      ],
    },
    {
      title: "USEFUL",
      items: [
        { name: "Stats", icon: "chart" },
        { name: "Notifications", icon: "bell" },
        { name: "Reports", icon: "mail" },
      ],
    },
    {
      title: "USER",
      items: [
        { name: "Profile", icon: "person" },
        { name: "Logout", icon: "exit" },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      {menuItems.map((section, index) => (
        <div key={index} className="sidebar-section">
          <h3 className="section-title">{section.title}</h3>
          <ul className="menu-list">
            {section.items.map((item, idx) => (
              <li key={idx} className="menu-item">
                <span className={`menu-icon icon-${item.icon}`}></span>
                <span className="menu-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
