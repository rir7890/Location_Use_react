import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <div>
        <Link to="api">Go to The Api call</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
