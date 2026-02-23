import React from "react";

const Header = () => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <button>Notifications</button>
        <button>Profile</button>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
 