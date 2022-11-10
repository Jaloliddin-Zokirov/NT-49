import React from "react";
import logo from "../image/footer-logo.svg";
import style from "./Footer.module.scss";
import footerOpacity from "../image/footer-opacity.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const goToTop = () =>
    document.getElementById("root").scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className={style.footer}>
      <div className={style.curtain}></div>
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.left}>
            <img
              className={style.opacity}
              src={footerOpacity}
              width={800}
              height={800}
              alt="footer img"
            />
            <Link to={"/"} onClick={goToTop}>
              <img src={logo} width={182} height={70} alt="footer logo img" />
            </Link>
          </div>
          <div className={style.right}>
            <div className={style.listLeft}>
              <p>FIGHT WITH ME ON:</p>
              <ul>
                <li>
                  <a href="https://twitter.com/">Twitter</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">Instagram</a>
                </li>
                <li>
                  <a href="https://www.telegram.org/">Telegram</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/">YouTube</a>
                </li>
                <li>
                  <a href="https://www.figma.com/">Figma</a>
                </li>
              </ul>
            </div>
            <div className={style.listCenter}>
              <p>WHAT I HAVE DONE:</p>
              <ul>
                <li>
                  <a href="/">Xalq Kutubxonasi</a>
                </li>
                <li>
                  <a href="https://www.website.com/?source=SC">Website</a>
                </li>
                <li>
                  <a href="https://www.website.com/?source=SC">Website</a>
                </li>
                <li>
                  <a href="https://play.google.com/">Play Market</a>
                </li>
                <li>
                  <a href="https://www.apple.com/app-store/">App Store</a>
                </li>
              </ul>
            </div>
            <div className={style.listRight}>
              <p>Contact</p>
              <ul>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Dribbble</a>
                </li>
                <li>
                  <a href="/">Behance</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
