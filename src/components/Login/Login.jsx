import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../../hooks/UserLogin";
import logo from "../image/logo.svg";
import style from "./Login.module.scss";

const Lodin = () => {
  const storage = window.localStorage;
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [data, setData] = UserLogin();

  const handleSubmit = () => {
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setData("login", user.email, user.password);
  };

  useEffect(() => {
    if (data.status === 200) {
      storage.setItem("token", data.status);
      navigate("/");
    }
  }, [data, navigate, storage]);

  return (
    <>
      <div className={style.container}>
        <div className={style.logoBox}>
          <Link to={"/"}>
            <img src={logo} width={209} height={58} alt="logo image" />
          </Link>
        </div>
        <div className={style.content}>
          <h2 className={style.title}>
            Sahifamga xush kelibsiz! Pulli kontentni o’qish uchun tizimga
            kiring.
          </h2>
          <form className={style.form} method="post">
            <p>Login</p>
            <input type="text" placeholder="Email" required ref={emailRef} />
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </form>
          <Link to={"/singin"}>Ro'yxatdan o'tish</Link>
        </div>
      </div>
    </>
  );
};

export default Lodin;
