import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Info from "../Info/Info";
import Login from "../Login/Login";
import SingIn from "../SingIn/SingIn";
import AuthProvider from "../AuthProvider/AuthProvider";
import Side from "../Side/Side";
import Error from "../Error/Error";
import Posts from "../Posts/Posts";
import { StoreContext } from "../StoreWrapper/StoreWrapper";

const App = () => {
  const storage = window.localStorage;
  const { category } = useContext(StoreContext);
  const [urlBar, setUrlBar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    setUrlBar(url);
  });
  if (urlBar === "http://localhost:3000/logout") {
    storage.removeItem("token");
    navigate("/login");
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Side />
          </AuthProvider>
        }
      >
        {category.length > 0 &&
          category.map((cat) => {
            return (
              <>
                <Route index element={<Info infoId={cat.id} />} />
                <Route
                  path={`${cat.name}`}
                  element={<Info infoId={cat.id} />}
                />
                <Route
                  path={`${cat.name}/:id`}
                  element={
                    <Posts categoryId={cat.id} categoryName={cat.name} />
                  }
                />
              </>
            );
          })}
      </Route>
      <Route path="*" element={<Error isOpen={true} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singin" element={<SingIn />} />
    </Routes>
  );
};

export default App;
