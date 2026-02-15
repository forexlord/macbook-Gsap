import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer>
      <div>
        This Application is made by{" "}
        <span className="text-white">
          {""}Recovery Eyo{""}
        </span>{" "}
        just to demo my skills and is not an affiliate of{" "}
        <span className="text-primary">Apple Inc.</span>
        <img src="/logo.svg" alt=" apple logo" />
      </div>

      <hr />
      <div className="links">
        <p>Copyright © 2026 Apple Inc. All rights reserved.</p>

        <ul>
          {footerLinks.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
