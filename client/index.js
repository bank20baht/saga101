const axios = require("axios");

const buyFood = async (foodId) => {
  try {
    const response = await axios.post("http://localhost:5000/order", {
      id: foodId,
    });

    return response.data.remainingBalance;
  } catch (error) {
    console.log("Error buying food:", error.message);
    return null;
  }
};

const getBalanceFromServer = async () => {
  try {
    const response = await axios.get("http://localhost:3000/balance");
    return response.data.balance;
  } catch (error) {
    console.log("Error fetching balance:", error.message);
    return null;
  }
};

const run = async () => {
  console.log("Before buying food");

  const beforeBalance = await getBalanceFromServer();
  if (beforeBalance !== null) {
    console.log(
      `My Balance at ${new Date().toISOString()} is ${beforeBalance}`
    );
  }

  const remainingBalance = await buyFood(2);

  console.log("After buying food");
  const afterBalance = await getBalanceFromServer();
  if (afterBalance !== null) {
    console.log(`My Balance at ${new Date().toISOString()} is ${afterBalance}`);
  }
};

run();
