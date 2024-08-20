const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let userBalance = 2000;

app.post("/payment", (req, res) => {
  const { price } = req.body;
  console.log(price);

  if (price && userBalance >= price) {
    userBalance -= price;
    res
      .status(200)
      .json({ message: "Payment complete", remainingBalance: userBalance });
  } else {
    res.status(400).json({ error: "Insufficient balance or invalid price" });
  }
});

app.get("/balance", (req, res) => {
  res.json({ balance: userBalance });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
