import { useState } from "react";

export const useSortData = (meals) => {
  const [sortedMeals, setSortedMeals] = useState([]);
  const sortMealsHandler = (sortBy = "ASC") => {
    if (sortBy === "ASC") {
      return setSortedMeals(meals.sort((a, b) => a.price - b.price));
    }
    if (sortBy === "DESC") {
      return setSortedMeals(meals.sort((a, b) => b.price - a.price));
    }
    return [];
  };
  return [sortedMeals, sortMealsHandler];
};
