import React from "react";
import { Link } from "react-router-dom";
import PermissionComponents from "../../components/PermissionComponents";

const Dashboard = () => {
  return (
    <>
      <h3>Menu</h3>
      <ul>
        <li>
          <PermissionComponents role="ROLE_ADMIN">
            <Link to="/dashboard">Dashboard</Link>
          </PermissionComponents>
        </li>
        <li>
          <PermissionComponents role="ROLE_ADMIN">
            <Link to="/product">Product</Link>
          </PermissionComponents>
        </li>
        <li>
          <PermissionComponents role="ROLE_ADMIN">
            <Link to="/product/list">Product list</Link>
          </PermissionComponents>
        </li>
      </ul>
    </>
  );
};

export default Dashboard;
