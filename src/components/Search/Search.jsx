import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../StoreWrapper/StoreWrapper";
import style from "./Search.module.scss";

const Search = ({ isOpen, info }) => {
  const { posts, category } = useContext(StoreContext);

  const filtered = posts.filter((el) => el.title.toLowerCase().includes(info));

  const [cat, setCat] = useState();

  useEffect(() => {
    posts.length > 0 &&
      posts.map((element) => {
        category.length > 0 &&
          category.map((el) => {
            if (el.id === element.categoryId) {
              setCat(el.name);
            }
          });
      });
  });

  if (isOpen) {
    return (
      <div className={style.search}>
        <h3>Natijalar</h3>
        {filtered.length === 0 ? (
          <p className={style.info}>Bunday ma'lumot mavjud emas !</p>
        ) : (
          filtered.length > 0 &&
          filtered.map((el) => {
            if (el.title.length > 0) {
              return (
                <Link
                  className={style.link}
                  to={`/${cat}/${el.id}`}
                  key={el.id}
                >
                  <div>
                    <p className={style.title}>{el.title}</p>
                    <time>September 24.2020</time>
                  </div>
                  <p className={style.desc}>{el.description}</p>
                </Link>
              );
            }
          })
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Search;
