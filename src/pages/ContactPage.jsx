import React from "react";

function ContactPage() {
  return (
    <div className="container-block">
      <div className="contacts">
        <h2>Branches:</h2>
        <h3>Ala Wai Boulevard Hawaii</h3>
        <h4>Opening Hours 8:00am-9:00pm</h4>
        <h3> Jacksonville Riverwalk St. Florida</h3>
        <h4>Opening Hours 8:00am-6:00pm</h4>
        <h3>Melrose Avenue California</h3>
        <h4>Opening Hours 8:00am-6:00pm</h4>
      </div>
      <div className="contact-page-img">
        <img
          width={400}
          src="https://www.noracooks.com/wp-content/uploads/2022/01/sq-3-500x500.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default ContactPage;
