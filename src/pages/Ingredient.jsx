import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../axios/apiClient';
import "./ingridients.css"

const IMAGE_API = "http://www.themealdb.com/images/ingredients";

function Ingi() {
    const { ingredient } = useParams();
    const [meals, setMeals] = useState([]);
    const [ingredientImage, setIngredientImage] = useState(null);

    useEffect(() => {

        async function getIngredientImage() {
            const imageUrl = `${IMAGE_API}/${ingredient}.png`; 
            setIngredientImage(imageUrl);
        }

        async function getMealsByIngredient() {
            try {
                const res = await apiClient.get(`/filter.php?i=${ingredient}`);
                setMeals(res.data.meals || []);
            } catch (error) {
                console.log(error);
            }
        }

        getIngredientImage();
        getMealsByIngredient();
    }, [ingredient]);

    return (
        <div className="ingredient-container">
            <div className="ingredient-image">
                {ingredientImage && (
                    <img src={ingredientImage} alt={ingredient} />
                )}

                <div className="arrow">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="meals-list">
                {meals.length > 0 ? (
                    meals.map((meal) => (
                        <div key={meal.idMeal} className="meal-card">
                            <img src={meal.strMealThumb} alt={meal.strMeal} />

                            <Link to={`/meal/${meal.idMeal}`}>
                                <h3>{meal.strMeal}</h3>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Нету такой еды к сожелению, ПРОСТИТЕ НАС</p>
                )}
            </div>
        </div>
    );
}

export default Ingi;
