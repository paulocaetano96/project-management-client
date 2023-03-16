import React from "react";

// ---------------------------------------------------- CSS IMPORTS
import "../styles/profile.css";

function Profile() {
  return (
    <section className="full-area-container">
    <div className="book">
      <div className="info">
          <img src="./images/easter-egg.png"></img>
      </div>
      <div className="cover">
        <p>Are we hiding something under this cover? Hover me and find out  </p>
        
      </div>
      
    </div>
    </section>
  );
}

export default Profile;
