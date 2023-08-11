import React, { useEffect, useState } from "react";
import { fetchRecuest } from "../api/fetchRecuest";

export const CartContext = React.createContext({
  cartMeals: [],
  totalAmount: 0,
  onAddMeal: () => {},
  increaseAmountHandler: () => {},
  decreaseAmountHandler: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartMeals, setCartMeals] = useState([]);

  const fetchCartMealsRequest = () => {
    fetchRecuest("basket").then((res) => {
      setCartMeals(res.data.items);
    });
  };

  useEffect(() => {
    fetchCartMealsRequest();
  }, []);

  const increaseAmountHandler = async (id, amount) => {
    fetchRecuest(`basketItem/${id}/update`, {
      method: "PUT",
      body: { amount: amount + 1 },
    }).then(fetchCartMealsRequest);
  };

  const decreaseAmountHandler = async (id, amount) => {
    if (amount === 1) {
      fetchRecuest(`basketItem/${id}/delete`, {
        method: "DELETE",
      }).then(fetchCartMealsRequest);
    } else {
      fetchRecuest(`basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount - 1 },
      }).then(fetchCartMealsRequest);
    }
  };
  const totalAmount = cartMeals.reduce((acc, meal) => {
    return acc + meal.price * meal.amount;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartMeals,
        totalAmount,
        onIncreaseMealAmount: increaseAmountHandler,
        onDecreaseMealAmount: decreaseAmountHandler,
        fetchCartMealsRequest: fetchCartMealsRequest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
