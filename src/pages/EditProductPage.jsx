import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

function EditProductPage() {
  const { getEditChocolate, toSaveEditedChocolate, savedEditedChocolate } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const editedChocolate = {
      name,
      weight,
      price,
      photo,
      id,
    };

    for (let i in editedChocolate) {
      if (typeof editedChocolate[i] === "string") {
        if (!editedChocolate[i].trim()) {
          alert("Please fill in all the required fields");
          return;
        }
      }
    }
    toSaveEditedChocolate(editedChocolate);
    navigate("/admin");
  };

  React.useEffect(() => {
    getEditChocolate(id);
  }, []);

  React.useEffect(() => {
    if (savedEditedChocolate) {
      setName(savedEditedChocolate.name);
      setWeight(savedEditedChocolate.weight);
      setPrice(savedEditedChocolate.price);
      setPhoto(savedEditedChocolate.photo);
    }
  }, [savedEditedChocolate]);

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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
export default EditProductPage;
