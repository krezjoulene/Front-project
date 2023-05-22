import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolIcon from '@mui/icons-material/School';
import PianoIcon from '@mui/icons-material/Piano';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../../components/context/darkModeContext";
import { useContext, useState } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    // Effectuer les actions de déconnexion, réinitialiser l'état
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("token");
  localStorage.removeItem("UserRole");
  window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="top">
          <span className="logo">Logo</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon2" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon2" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon2" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/teachers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon2" />
              <span>Enseignant</span>
            </li>
          </Link>
          <Link to="/playlists" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon2" />
              <span>Cours</span>
            </li>
          </Link>
          <Link to="/conservatoires" style={{ textDecoration: "none" }}>
            <li>
              <PianoIcon className="icon2" />
              <span>Conservatoires</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon2" />
            <span>Orders</span>
          </li>
        
          <p className="title">USEFUL</p>
          <li>
          <a href="http://localhost:1080/#/" target="_blank" rel="noopener noreferrer">
            <NotificationsNoneIcon className="icon2" />
            <span>Notifications</span>
            </a>
          </li>
      
          <p className="title">USER</p>
          <li>
            <Link to="/AdminProfile">
            <AccountCircleOutlinedIcon className="icon2" />
            <span>Profile</span>
            </Link>
          </li>
          <li>
            <ExitToAppIcon className="icon2" />
            <span><div onClick={handleLogout}>Logout</div></span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
/*   <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
*/