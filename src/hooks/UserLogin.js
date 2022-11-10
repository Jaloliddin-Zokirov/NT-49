import { useState } from "react";

const UserLogin = () => {
  const [auth, setAuth] = useState({});
  const connectLogin = async (query, email, password) => {
    await fetch(`https://reqres.in/api/${query}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res)
      .then((data) => setAuth(data));
  };
  return [auth, connectLogin];
};

export default UserLogin;
