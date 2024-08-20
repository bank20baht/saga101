const express = require("express");
const app = express();
const port = 4000;

const foodList = [
  {
    id: 1,
    name: "กะเพรา",
    price: 50,
  },
  {
    id: 2,
    name: "คะน้า",
    price: 35,
  },
  {
    id: 3,
    name: "ผัดซีอิ้ว",
    price: 40,
  },
];

app.get("/food", (req, res) => {
  res.send(foodList);
});

app.get("/food/:id", (req, res) => {
  const foodId = parseInt(req.params.id, 10);

  const foodItem = foodList.find((item) => item.id === foodId);

  if (foodItem) {
    res.json(foodItem);
  } else {
    res.status(404).send("Food item not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
