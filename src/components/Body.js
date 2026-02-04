import RestaurantCard from "./RestaurantCard";
import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus.js";



const Body =() =>{
        //local state variable
        const [listOfRestaurants,setListOfRestaurant]=useState([]);
        const[filteredRestaurant,setFilteredRestaurant]=useState([]);
        const[searchText, setSearchText]=useState("");

        
        //whenever state variables update, react triggers a reconciliation cycle(re-render the component)

        useEffect(()=>{
                fetchData();
        }, []);

        const fetchData = async () => {
                const data= await fetch(
                        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
                );

                const json=await data.json();
               //optional chaining
                setListOfRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
                setFilteredRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

        };

        const onlineStatus=useOnlineStatus();

        if(onlineStatus===false) return (
                <h1>
                        Looks like you're Offline,Please Check Your Internet Connection
                </h1>

        );




        return listOfRestaurants.length === 0 ? (
                <Shimmer /> 
        ) :(
                <div className="body">
                        <div className="filter">
                                <div className="search">
                                        <input 
                                        type="text" 
                                        className="search-box" 
                                        value={searchText} 
                                        onChange={(e) => {
                                                setSearchText(e.target.value);
                                        }}
                                        />
                                        <button 
                                        onClick={()=>{
                                                //filter the resturant cards and update the UI
                                                //searchtext
                                                const filteredRestaurant= listOfRestaurants.filter((res) => 
                                                        res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                                );

                                                setFilteredRestaurant(filteredRestaurant);

                                        }}
                                        >
                                        Search
                                        </button>
                                </div>

                                <button className="filter-btn"
                                 onClick={() => {
                                        const filteredList=listOfRestaurants.filter(
                                                (res)=>res.info.avgRating > 4
                                        );
                                        setListOfRestaurant(filteredList);
                                }}

                                 >
                                        Top Rated Restaurant</button>
                                </div>
                        <div className="res-container">
                                {filteredRestaurant.map(restaurant=>(
                                        <RestaurantCard key={restaurant.info.id} resData={restaurant}/>))}
                        </div>
                </div>
        );
};

export default Body;