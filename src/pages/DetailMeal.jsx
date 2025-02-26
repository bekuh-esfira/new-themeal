import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../axios/apiClient';
import './Detail.css';
import { flag } from '../data/flag';

const IMAGE_API = "http://www.themealdb.com/images/ingredients";
const API = "https://www.themealdb.com/images/icons/flags/big/64";

function Detail() {
    const { id } = useParams();
    const [info, setInfo] = useState({});
    const navigate =useNavigate()

    const findTitle = flag.find((x) => x.title === info.strArea);

    async function getMealById() {
        try {
            const res = await apiClient.get(`/lookup.php?i=${id}`);
            setInfo(res.data.meals[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMealById();
    }, [id]);

    let array = [];

    for (let i = 1; i <= 20; i++) {
        let strName = info["strIngredient" + i];
        if (strName) {
            array.push({ name: strName });
        }
    }
    function setId(text) {

let newxId =text=="nex"? Number (id)+1:Number(id)-1
navigate(`/meal/${newxId}`)


    }

    let textArray = info?.strInstructions?.split?.(",")
    console.log(textArray);
    

    return (
        <div className="container-info">
            <div className="arrow">
        
                <div className="arrows">
                    <img
                    onClick={()=> setId("prev")}  
                        src="https://www.themealdb.com/images/icons/Arrow-Left.png"
                        alt="Left Arrow"
                        className="arrow-left"
                    />
                <img src={`${API}/${findTitle?.img}.png`} alt="" className="flag-img" />
              
                    <img
                      onClick={()=> setId("nex")}  src="https://www.themealdb.com/images/icons/Arrow-Right.png"
                        alt="Right Arrow"
                        className="arrow-right"
                    />
                </div>
            </div>
            <div className="info-content">
                <div className="info-left">
                    <img src={info.strMealThumb} alt={info.strMeal} className="meal-img" />
                </div>
                <div className="info-right">
                    {array.map((item, index) => (
                        <div key={index} className="ingredient">
                            <Link to={`/ingredient/${item.name}`}>
                                <img
                                    src={`${IMAGE_API}/${item.name}.png`}
                                    alt={item.name}
                                    className="ingredient-img"
                                />
                                <p>{item.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className='info-des'>
                {
                    textArray?.map((item,index)=>(
                        <div key={index}>{item}</div>       
                    ))  
                }
            </div>
        </div>
    );
}

export default Detail;
