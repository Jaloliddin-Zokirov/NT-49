import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Posts.module.scss";
import { StoreContext } from "../StoreWrapper/StoreWrapper";
import likesIcon from "../image/like-icon.svg";
import shareIcon from "../image/share-icon.svg";
import timeIcon from "../image/reed-time.svg";
import { axiosApi } from "../../Api/Api";
import dayjs from "dayjs";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Posts = ({ categoryId, categoryName }) => {
  const { id } = useParams();
  const { dispatch, posts, category, error, loading } =
    useContext(StoreContext);

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: true,
    });
    axiosApi
      .get(`/category/${categoryId}/posts`)
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
  }, [dispatch, category, error, categoryId]);

  const goToTop = () =>
    document.getElementById("root").scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className={style.posts}>
      <div className={style.container}>
        {loading && <Loading isOpen={loading} />}
        {error && <Error isOpen={error.state} />}
        {posts.length > 0 &&
          posts.map((el) => {
            if (el.id === id) {
              return (
                <div className={style.box} key={el.id} id={el.id}>
                  <div className={style.left}>
                    <span>
                      <img
                        src={likesIcon}
                        width={18}
                        height={19}
                        alt="likes icon"
                      />
                      <span>{el.likes}</span>
                    </span>
                    <span>
                      <img
                        src={shareIcon}
                        width={18}
                        height={19}
                        alt="likes icon"
                      />
                      <span>{el.shares}</span>
                    </span>
                  </div>
                  <div className={style.right}>
                    <div className={style.top}>
                      <span className={style.desc}>User interface</span>
                      <h2>{el.title}</h2>
                      <div>
                        <time>
                          {dayjs(el.createdAt).format("MMMM D, YYYY")}
                        </time>
                        <span>
                          <img
                            src={timeIcon}
                            width={20}
                            height={20}
                            alt="time icon"
                          />
                          {el.readTime} minutes read
                        </span>
                      </div>
                      <img
                        className={style.postImage}
                        src={el.image}
                        width={849}
                        height={420}
                        alt={el.title}
                      />
                      <p className={style.content}>{el.content}</p>
                      <p className={style.describtion}>
                        <span>{el.description}</span>
                        <span>
                          {dayjs(el.createdAt).format("MMMM D, YYYY")}
                        </span>
                      </p>
                    </div>
                    <div className={style.bottom}>
                      <h2>More like this</h2>
                      {posts.length > 0 &&
                        posts.slice(2, 5).map((element) => {
                          return (
                            <Link
                              onClick={goToTop}
                              key={element.id}
                              to={`/${categoryName}/${element.id}`}
                            >
                              <div className={style.item}>
                                <div className={style.itemTop}>
                                  <time>
                                    {dayjs(element.createdAt).format(
                                      "MMMM D.YYYY"
                                    )}
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
                        })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </section>
  );
};

export default Posts;
