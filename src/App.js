import React,{useEffect,useState} from 'react';

import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData} from './api';

function App() {
  const [places,setPlaces]=useState([]);
  const [filteredPlaces,setFilteredPlaces]=useState([]);
  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const [type,setType]=useState('restaurants');
  const [rating,setRating]=useState('');
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude});
    })

  },[]);

  useEffect(()=>{
    const filterPlaces= places.filter((place) => (place.rating > rating));
    setFilteredPlaces(filterPlaces);
  },[rating,places]);

  useEffect(()=>{
      setIsLoading(true);
      getPlacesData(type,bounds.sw,bounds.ne).then((data)=>{
          setPlaces(data); 
          setFilteredPlaces([]);
          setIsLoading(false);
      })},[type,coordinates,bounds]);

  
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length? filteredPlaces :places} childClicked={childClicked} isLoading={isLoading} rating={rating} type={type} setRating={setRating} setType={setType}/>
        </Grid>

        <Grid item xs={12} md={8}>
          <Map  setBounds={setBounds} setCoordinates={setCoordinates} coordinates={coordinates} places={filteredPlaces.length? filteredPlaces :places} setChildClicked={setChildClicked} isLoading={isLoading}/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
