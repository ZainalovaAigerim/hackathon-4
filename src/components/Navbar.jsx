import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../images/facebook.png";
import instagramIcon from "../images/instagram.png";
import youtubeIcon from "../images/youtube.png";
import pinterestIcon from "../images/pinterest.png";
import shoppingBagIcon from "../images/shopping-bag.png";
import adminIcon from "../images/administrator.png";
import { Badge, IconButton } from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";
import Hamburger from "hamburger-react";

function Navbar() {
  const { cartCount, isOpen, setOpen } = React.useContext(ClientContext);

  return (
    <div className="navbar-menu">
      <div className="navbar-left">
        <Link to="/">baisers de chocolat</Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contacts">Contact</Link>
      </div>
      <div className="navbar-right">
        <img src={facebookIcon} alt="facebook" />
        <img src={instagramIcon} alt="instagram" />
        <img src={youtubeIcon} alt="youtube" />
        <img src={pinterestIcon} alt="pinterest" />

        <Link to="/basket">
          <IconButton>
            <Badge badgeContent={cartCount} color="primary">
              <img
                className="shopping-cart-icon"
                src={shoppingBagIcon}
                alt=""
              />
            </Badge>
          </IconButton>
        </Link>
        <Link to="/admin">
          <img src={adminIcon} alt="" />
        </Link>
      </div>
      <div className="navbar__right_mobile">
        <Hamburger color="#fff" toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
}

export default Navbar;
