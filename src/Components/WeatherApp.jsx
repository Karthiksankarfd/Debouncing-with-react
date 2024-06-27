import React, { useEffect, useState } from "react";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setLoading(true); // Start loading
      fetchWeatherData(location)
        .then((data) => {
          console.log(data);
          setWeatherData(data);
          setLoading(false); // Stop loading when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setLoading(false); // Stop loading in case of error
        });
    }
  }, [location]);
    
    const handleLocationChange = useDebounce ((value) => {
      // !Here the callback function is itself a function and takes a parameter value and that parameter
      // !value is e.target.value 
      // *here now the handleLocationChange function has the refrence of usedebounce function
      // *that usedebounce function takes two arguments one is the callback function and another one 
      // *is the delay , here that callback function accepts a parameter and the parameter value is
      // *the input value and the second one is delay which is passed by default 
      setLocation(value);
    }); // Adjust the delay time as needed
  
  // *function for fetching the weather data from the api 
  const fetchWeatherData = async (location) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d4ac2bd5793147939c595502230109&q=${location}&aqi=yes`);
    const data = await response.json();
    console.log(data)
    return data;
  };

  // *declaration of usedebounce function with two parameter - callbcak and delay
  function useDebounce(callback, delay = 2000) {
    // *declaration of variable timeoutid
    let timeoutId;
    // *returing a new function named debounced and passing the callback function 
    // *arguments by using the rest parameter syntax

    // *...args: The rest parameter syntax. It allows the debounced function to accept
    //  *any number of arguments, which are passed to the callback when it is eventually invoked
    return function debounced(...args) {
      // *here we are clearing the prevoius settimeout 

      // *This ensures that if the debounced function is called multiple times within the delay period,
      // *the previous timeout is canceled and a new one is set.
      clearTimeout(timeoutId);

      // *setting the new settimeout 
      timeoutId = setTimeout(() => {
        // *here we are calling the callback function with the newly passed arguments
        callback(...args);
      }, delay);
    };
  }
  return (
    <div>
      <h1>This is weather app</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{weatherData && weatherData.location.name}</h2>
          <h2>{weatherData && weatherData.current.condition.text}</h2>
        </>
      )}
      <form>
        <input
          onChange={(e) => handleLocationChange(e.target.value)}
          type="text"
          placeholder="Enter your location"
        />
      </form>
    </div>
  );
};

export default WeatherApp;
