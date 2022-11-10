import React, { useContext, useEffect, useState } from "react";
import style from "./Info.module.scss";
import arrow from "../image/arrow-right.svg";
import ficebook from "../image/ficebook-icon.svg";
import github from "../image/github-icon.svg";
import twitter from "../image/twitter-icon.svg";
import incidin from "../image/in-icon.svg";
import timeIcon from "../image/reed-time.svg";
import arrowLeft from "../image/arrow-left-icon.svg";
import arrowRight from "../image/arrow-right-icon.svg";
import { axiosApi } from "../../Api/Api";
import { StoreContext } from "../StoreWrapper/StoreWrapper";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Indo = ({ infoId }) => {
  const { dispatch, posts, category, loading, error } =
    useContext(StoreContext);

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

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: true,
    });
    axiosApi
      .get(`/category/${infoId}/posts`)
      .then((posts) => {
        dispatch({
          type: "posts",
          payload: posts.data,
        });
        dispatch({
          type: "loading",
          payload: false,
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
  }, [dispatch, category, error, infoId]);

  const goToTop = () =>
    document.getElementById("root").scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className={style.info}>
      {loading && <Loading isOpen={loading} />}
      {error && <Error isOpen={error.state} />}
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.left}>
            <div className={style.top}>
              <h2>What I do!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                aliquet, orci in bibendum luctus, turpis ante pretium velit, eu
                rutrum augue erat ac eros. Cras ultricies mattis convallis.
              </p>
              <span className={style.more}>
                EXPLORE ME{" "}
                <button>
                  <img
                    src={arrow}
                    width={20}
                    height={20}
                    alt="arrow icon img"
                  />
                </button>
              </span>
            </div>
            <div className={style.bottom}>
              <img src={ficebook} alt="icon" />
              <img src={github} alt="icon" />
              <img src={twitter} alt="icon" />
              <img src={incidin} alt="icon" />
            </div>
          </div>
          <div className={style.right}>
            <h2>Recent Posts</h2>
            <div className={style.list}>
              {posts.length === 0 ? (
                <p className={style.info}>
                  Hali bu kategoriya ishlanmoqda! <br /> Hozircha boshqa
                  kategoriyalardan foydalanib turing.
                </p>
              ) : (
                posts.length > 0 &&
                posts.map((element) => {
                  return (
                    <Link
                      key={element.id}
                      onClick={goToTop}
                      to={`/${cat}/${element.id}`}
                    >
                      <div className={style.item}>
                        <div className={style.itemTop}>
                          <time>
                            {dayjs(element.createdAt).format("MMMM D.YYYY")}
                          </time>
                          <span>
                            {category.length > 0 &&
                              category.map((el) => {
                                return (
                                  <>
                                    {element.categoryId === el.id
                                      ? el.name
                                      : ""}
                                  </>
                                );
                              })}
                          </span>
                        </div>
                        <div className={style.itemBottom}>
                          <h3>{element.title}</h3>
                          <p>{element.description}</p>
                          <span>
                            <img
                              src={timeIcon}
                              width={20}
                              height={20}
                              alt="time icon"
                            />
                            {element.readTime} minutes read
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
            <div className={style.arrowBox}>
              <button>
                <img src={arrowLeft} width={6} height={10} alt="arrow icon" />
              </button>
              <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <button>
                <img src={arrowRight} width={6} height={10} alt="arrow icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Indo;
