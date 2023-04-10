import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true)
      const response = await fetch('https://ringed-metric-368421-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      if(!response.ok){
        throw new Error('Something went wrong')
      }
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setLoading(false)
      setMeals(loadedMeals);
    };
       fetchMeals().catch((error)=>{
        setLoading(false)
        setHttpError(error.message)
    });
  },[]);

  if(loading){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if(httpError){
    return(<section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>)
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
       <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;