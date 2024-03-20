import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';

const Map = ({setBounds,setCoordinates,coordinates,places,setChildClicked,isLoading}) => {
  const classes=useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  console.log(places);
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys= {{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={{lat:0,lng:0}}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}
        onChange={(e)=>{
          setCoordinates({lat: e.center.lat, lng: e.center.lng});
          setBounds({sw:e.bounds.sw,ne:e.bounds.ne});
        }}
        onChildClick={(child)=>{setChildClicked(child)}}

        >
        {places?.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches
                ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                    <img
                      className={classes.pointer}
                      src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    />
                    <Rating size="small" value={Number(place.rating)} readOnly />
                  </Paper>
                  
                )}
            </div>
          ))
        }
       



      </GoogleMapReact>
    </div>
  )
}

export default Map
