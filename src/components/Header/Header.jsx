import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosApi } from "../../Api/Api";
import logo from "../image/logo.svg";
import Search from "../Search/Search";
import { StoreContext } from "../StoreWrapper/StoreWrapper";
import style from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState();
  const { dispatch, category } = useContext(StoreContext);

  useEffect(() => {
    axiosApi
      .get("/category")
      .then((posts) => {
        dispatch({
          type: "category",
          payload: posts.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "error",
          error: {
            status: true,
            message: error.message,
          },
        });
      });
  }, [dispatch]);

  const inputRef = useRef(null);

  return (
    <>
      <header className={style.header}>
        <div className={style.container}>
          <div className={style.box}>
            <div className={style.left}>
              <Link to={"/"}>
                <img src={logo} width={209} height={58} alt="side logo img" />
              </Link>
              <input
                className={style.checkBox}
                type="checkbox"
                id="check"
                checked={check}
              />
              <label
                className={style.hamburger}
                for={"check"}
                onClick={() => {
                  check ? setCheck(false) : setCheck(true);
                }}
              >
                <div>
                  <span className={style.line}></span>
                  <span className={style.line}></span>
                  <span className={style.line}></span>
                </div>
              </label>
              <div className={style.listBox}>
                <div className={style.list}>
                  {category.length > 0 &&
                    category.map((el) => {
                      return (
                        <div key={el.id}>
                          <Link
                            to={`/${
                              el.name.toLowerCase() === "tenetur"
                                ? ""
                                : el.name.toLowerCase()
                            }`}
                            onClick={() => setCheck(false)}
                          >
                            {el.name.toUpperCase()}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className={style.search}>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search"
                value={value}
                onChange={(evt) => {
                  setStatus(evt.target.value.length > 0 ? true : false);
                  setValue(evt.target.value);
                }}
              />
              {value.length === 0 ? (
                <button type="button" onClick={() => inputRef.current.focus()}>
                  <SearchIcon />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setValue([]);
                    setStatus(false);
                  }}
                >
                  <CloseIcon />
                </button>
              )}

              <Search isOpen={status} info={value} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
