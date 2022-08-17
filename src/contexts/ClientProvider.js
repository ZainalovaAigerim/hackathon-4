import React from "react";
import { chocolatesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_CHOCOLATES") {
    return {
      ...state,
      chocolates: action.payload,
    };
  }
  if (action.type === "GET_CHOCOLATES_FROM_CART") {
    return {
      ...state,
      cartChocolates: action.payload,
    };
  }
  if (action.type === "GET_CART_COUNT") {
    return {
      ...state,
      cartCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    chocolates: [],
    cartChocolates: {
      chocolates: [],
      totalPrice: 0,
    },
    cartCount: 0,
  });

  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 100]);
  const [minmax, setMinMax] = React.useState([0, 100]);

  const limit = 6;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [isOpen, setOpen] = React.useState(false);

  const [like, setLike] = React.useState(false);
  const addLike = (id, likesCount) => {
    fetch(`${chocolatesApi}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likesCount + 1 }),
    }).then(() => getChocolates());
  };

  const getChocolates = () => {
    fetch(
      `${chocolatesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_CHOCOLATES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const addChocolateToCart = (newChocolate) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        totalPrice: 0,
        chocolates: [],
      };
    }
    let chocolateToCart = {
      ...newChocolate,
      count: 1,
      subPrice: newChocolate.price,
    };

    let check = cart.chocolates.find((item) => {
      return item.id === chocolateToCart.id;
    });
    if (check) {
      cart.chocolates = cart.chocolates.map((item) => {
        if (item.id === chocolateToCart.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      cart.chocolates.push(chocolateToCart);
    }
    cart.totalPrice = cart.chocolates.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartCount();
  };

  const getChocolatesFromCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let action = {
      type: "GET_CHOCOLATES_FROM_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const getPrices = () => {
    fetch(chocolatesApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = +data[data.length - 1].price;
        let min = +data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  const getCartCount = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        chocolates: [],
      };
    }
    let action = {
      type: "GET_CART_COUNT",
      payload: cart.chocolates.length,
    };
    dispatch(action);
  };

  const deleteChocolateFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.chocolates = cart.chocolates.filter((item) => {
      return item.id !== id;
    });

    cart.totalPrice = cart.chocolates.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    getChocolatesFromCart();
  };

  React.useEffect(() => {
    getPrices();
    getCartCount();
  }, []);

  const data = {
    chocolates: state.chocolates,
    pagesCount,
    currentPage,
    searchWord,
    filterByPrice,
    minmax,
    cartChocolates: state.cartChocolates,
    cartCount: state.cartCount,
    like,
    isOpen,
    getChocolates,
    setPagesCount,
    setCurrentPage,
    setSearchWord,
    setFilterByPrice,
    setMinMax,
    getChocolatesFromCart,
    addChocolateToCart,
    getCartCount,
    deleteChocolateFromCart,
    setLike,
    addLike,
    setOpen,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
