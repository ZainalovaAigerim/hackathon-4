import React from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";

function AdminPage() {
  const { getChocolates, chocolates, deleteChocolate } =
    React.useContext(AdminContext);

  React.useEffect(() => {
    getChocolates();
  }, []);

  return (
    <div className="table-block">
      <table>
        <caption>View all products</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Photo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {chocolates.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.weight}g</td>
              <td>${item.price}</td>
              <td>
                <img width={80} src={item.photo} alt="" />
              </td>
              <td>
                <Link to={`/admin/edit/${item.id}`}>
                  <img width={22} src={editIcon} alt="" />
                </Link>
              </td>
              <td>
                <img
                  onClick={() => deleteChocolate(item.id)}
                  width={30}
                  src={deleteIcon}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="admin-add" to="/admin/add">
        Add new product
      </Link>
    </div>
  );
}

export default AdminPage;
