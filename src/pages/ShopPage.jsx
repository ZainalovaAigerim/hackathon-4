import React from "react";
import { ClientContext } from "../contexts/ClientProvider";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Slider,
} from "@mui/material";

function ShopPage() {
  const {
    chocolates,
    getChocolates,
    pagesCount,
    currentPage,
    filterByPrice,
    setCurrentPage,
    searchWord,
    setSearchWord,
    setFilterByPrice,
    minmax,
    addChocolateToCart,
    addLike,
  } = React.useContext(ClientContext);

  const [likedChocolates, setLikedChocolates] = React.useState([]);
  const handleLike = (id, likesCount) => {
    addLike(id, likesCount);
    setLikedChocolates([...likedChocolates, id]);
  };

  React.useEffect(() => {
    getChocolates();
  }, [currentPage, searchWord, filterByPrice]);

  return (
    <div className="container">
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        type="search"
        placeholder="Search..."
      />
      <button className="search-button">Search</button>
      <div className="filter-block">
        <h3>Price:</h3>
        <Slider
          max={minmax[1]}
          min={minmax[0]}
          valueLabelDisplay="auto"
          value={filterByPrice}
          onChange={(_, newValue) => setFilterByPrice(newValue)}
        />
      </div>

      <div className="shop-page">
        <h2>CHOOSE YOUR CHOCOLATE</h2>
        <div className="cards">
          {chocolates.map((item) => (
            <div key={item.id} className="product-card">
              <Card className="product-cards">
                <div>
                  <CardMedia
                    component="img"
                    height={140}
                    image={item.photo}
                    alt="truffles"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                    <Typography>
                      <button
                        className="like-btn"
                        disabled={likedChocolates.includes(item.id)}
                        onClick={() => handleLike(item.id, item.likes)}
                      >
                        {likedChocolates.includes(item.id)
                          ? `❤️${item.likes}`
                          : `🤍 ${item.likes}`}
                      </button>
                    </Typography>
                  </CardContent>
                </div>
              </Card>
              <button
                onClick={() => addChocolateToCart(item)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
          />
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
