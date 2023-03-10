import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//importing the browser router from the npm package react-router-dom and naming it router
import { BrowserRouter as Router } from "react-router-dom";
//we import the AuthWrapper from context
import { AuthWrapper } from "./context/auth.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {/* we wrap the authentication around App so that we can use itl */}
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Router>
  </React.StrictMode>
);
