import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "../../../../components/context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar2">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items2">
          <div className="item2">
            <LanguageOutlinedIcon className="icon2" />
            Francais
          </div>
          <div className="item2">
            <DarkModeOutlinedIcon
              className="icon2"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item2">
            <FullscreenExitOutlinedIcon className="icon2" />
          </div>
         
          <a href="http://localhost:1080/#/" target="_blank" rel="noopener noreferrer">
            <div className="item2">
            <NotificationsNoneOutlinedIcon className="icon2" />
              <div className="counter">2</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
