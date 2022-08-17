import React from "react";

function Footer() {
  return (
    <div className="contact-block">
      <h2>CONTACT</h2>
      <h3>
        TEL: 123-456-7890 / INFO@MY-DOMAIN.COM <br /> 500 TERRY FRANCOIS ST. SAN
        FRANCISCO, CA 94158 <br /> OPENING HOURS 8:00AM-9:00PM
      </h3>

      <input placeholder="Name" type="text" />
      <input placeholder="Email" type="email" />
      <input placeholder="Subject" type="text" />
      <input placeholder="Message" type="text" />
      <button>Submit</button>
    </div>
  );
}

export default Footer;
