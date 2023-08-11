import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { MealItem } from "./meal-item/MealItem";
import { fetchRecuest } from "../../api/fetchRecuest";
import { useSortData } from "../../hooks/useSortData";
import { Button } from "../UI/Button";

const DUMMY_MEALS = [
  {
    id: 1,
    title: "Sushi",
    description: "finest fish and veggies",
    price: 22.99,
  },
  {
    id: 2,
    title: "Pizza",
    description: "finest fish and veggies",
    price: 16.0,
  },
  {
    id: 3,
    title: "Barbecue",
    description: "finest fish and veggies",
    price: 12.99,
  },
  {
    id: 4,
    title: "Green Bowl",
    description: "finest fish and veggies",
    price: 19.99,
  },
];

export const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortedMeals, sortMealsHandler] = useSortData([...meals]);

  useEffect(() => {
    fetchRecuest("foods").then((result) => setMeals(result.data));
  }, []);
  const rendeeredMeals = sortedMeals.length ? sortedMeals : meals;

  return (
    <Container>
      <div>
        <Button size="small" onClick={() => sortMealsHandler("ASC")}>
          ASC
        </Button>
        <Button size="small" onClick={() => sortMealsHandler("DESC")}>
          DESC
        </Button>
      </div>
      <ul>
        {rendeeredMeals.map((meal) => {
          return (
            <MealItem
              key={meal._id}
              id={meal._id}
              title={meal.title}
              description={meal.description}
              price={meal.price}
            />
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled("section")`
  padding: 40px;
  background-color: #ffffff;
  border-radius: 1rem;
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;

  & > ul {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    list-style: none;
  }

  @keyframes meals-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
