import React from "react";
import { chocolatesApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_CHOCOLATES") {
    return {
      ...state,
      chocolates: action.payload,
    };
  }
  if (action.type === "GET_EDIT_CHOCOLATE") {
    return {
      ...state,
      savedEditedChocolate: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    chocolates: [],
    savedEditedChocolate: null,
  });

  const addNewChocolate = (newChocolate) => {
    fetch(chocolatesApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChocolate),
    }).then(() => {
      getChocolates();
    });
  };

  const getChocolates = () => {
    fetch(chocolatesApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_CHOCOLATES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteChocolate = (id) => {
    fetch(`${chocolatesApi}/${id}`, {
      method: "DELETE",
    }).then(() => getChocolates());
  };

  const getEditChocolate = (id) => {
    fetch(`${chocolatesApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_EDIT_CHOCOLATE",
          payload: data,
        };
        dispatch(action);
      });
  };

  const toSaveEditedChocolate = (editedChocolate) => {
    fetch(`${chocolatesApi}/${editedChocolate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedChocolate),
    });
  };

  const data = {
    chocolates: state.chocolates,
    savedEditedChocolate: state.savedEditedChocolate,
    getChocolates,
    addNewChocolate,
    deleteChocolate,
    getEditChocolate,
    toSaveEditedChocolate,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
