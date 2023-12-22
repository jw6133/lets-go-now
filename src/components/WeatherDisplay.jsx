import React, { useEffect, useState } from 'react'
import axios from 'axios';

function WeatherDisplay() {
    const weatherApi= process.env.REACT_APP_WEATHER_API_KEY;
    const Wurl= `api/file?authKey=${weatherApi}`;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
          setError(null);
          setData(null);
          setLoading(true);
    
          const response = await axios.get(Wurl, {
            params: {
              serviceKey: process.env.REACT_APP_API_KEY,
              numOfRows: 1,
              pageNo: 10
            }
          });
    
          setData(response.data);
          
        } catch(e) {
          setError(e);
        }
        setLoading(false);
      };
    
      useEffect(() => {
        fetchData();
      }, []);
      
      if(loading) return <div>Loading...</div>;
      if(error)   return <div>Error...</div>;
      if(!data)   return null;
    
    
    return (
        <div>
            <p>weather</p>
        </div>
    )
}

export default WeatherDisplay
