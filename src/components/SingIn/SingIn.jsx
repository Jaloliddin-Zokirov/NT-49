import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogin from "../../hooks/UserLogin";
import logo from "../image/logo.svg";
import style from "./SingIn.module.scss";

const Register = () => {
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
    setData("register", user.email, user.password);
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
            Sahifamga xush kelibsiz! Pulli kontentni o’qish uchun ro'yxatdan
            o'ting.
          </h2>
          <form className={style.form} method="post">
            <p>SingIn</p>
            <input ref={emailRef} type="text" placeholder="Email" required />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </form>
          <Link to={"/login"}>Ortga qaytish</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
