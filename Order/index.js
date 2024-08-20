const axios = require("axios");
const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

app.post("/order", async (req, res) => {
  const { id } = req.body;
  let foodPrice;

  try {
    const foodPriceById = await axios.get(`http://localhost:4000/food/${id}`);
    if (foodPriceById !== null) {
      foodPrice = foodPriceById.data.price;
      console.log("sss" + foodPrice);
    }
    console.log("eee" + foodPrice);
    const payment = await axios.post("http://localhost:3000/Payment", {
      price: foodPrice,
    });

    if (payment.status === 200) {
      res.json("Order complete!");
    } else {
      res.status(500).json("Payment failed!");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error processing payment", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
