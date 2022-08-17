import React from "react";
import { AdminContext } from "../contexts/AdminProvider";

function AddNewProduct() {
  const { addNewChocolate } = React.useContext(AdminContext);

  const [name, setName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const newChocolate = {
      name: name.trim(),
      weight: weight.trim(),
      price,
      photo: photo.trim(),
      likes: 0,
    };

    for (let i in newChocolate) {
      if (!newChocolate[i]) {
        alert("Please fill in all the required fields");
        return;
      }
    }
    addNewChocolate(newChocolate);
    setName("");
    setWeight("");
    setPrice("");
    setPhoto("");
  };

  return (
    <div className="add-product-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          type="text"
          placeholder="weight"
        />
        <input
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          type="number"
          placeholder="price"
        />
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          type="text"
          placeholder="photo"
        />

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}

export default AddNewProduct;
