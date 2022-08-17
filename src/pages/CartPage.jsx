import React from "react";
import { ClientContext } from "../contexts/ClientProvider";
import deleteIcon from "../images/delete.png";

function CartPage() {
  const {
    cartChocolates,
    getChocolatesFromCart,
    deleteChocolateFromCart,
    getChocolates,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getChocolatesFromCart();
  }, []);

  // React.useEffect(() => {
  //   getChocolates();
  // }, []);

  if (!cartChocolates.chocolates.length) {
    return (
      <div className="cart-page">
        <div className="container">
          <h2>Cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="table-block">
      <h2>My cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Photo</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartChocolates.chocolates.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>
                <img width={80} src={item.photo} alt="" />
              </td>
              <td>${item.price}</td>
              <td>{item.count}</td>
              <td>${item.subPrice}</td>
              <td>
                <img
                  onClick={() => deleteChocolateFromCart(item.id)}
                  width={30}
                  src={deleteIcon}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${cartChocolates.totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CartPage;
