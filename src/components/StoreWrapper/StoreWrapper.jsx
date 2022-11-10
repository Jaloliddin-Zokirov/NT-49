import React, { createContext, useReducer } from "react";

export const StoreContext = createContext();

const StoreWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreWrapper;

const initialState = {
  posts: [],
  category: [],
  loading: false,
  error: {
    status: false,
    message: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "posts": {
      return {
        ...state,
        posts: action.payload,
      };
    }

    case "category": {
      return {
        ...state,
        category: action.payload,
      };
    }

    case "loading": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case "error": {
      return {
        ...state,
        error: {
          status: action.payload,
          message: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
