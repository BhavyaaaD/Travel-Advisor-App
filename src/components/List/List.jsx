import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core';
import React from 'react';
import useStyles from './style';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
const List = ({places,childClicked,isLoading,rating,type,setRating,setType}) => {
  const classes=useStyles();
  
  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants,Hotels & Attractions around you</Typography>
      {isLoading?(<div>
        <CircularProgress  size="3rem" className={classes.loading}/>
      </div>)
      :(<>
      <FormControl className={classes.formControl}>
        <InputLabel >Type</InputLabel>
        <Select value={type} onChange={(e)=>(setType(e.target.value))}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotel">Hotels</MenuItem>
          <MenuItem value="attraction">Attractions</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select  value={rating} onChange={(e)=>(setRating(e.target.value))}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        { places?.map((place,index)=>(
          <Grid item xs={12} key={index}>
            <PlaceDetails place={place}/>
          </Grid>
        ))}

      </Grid>
      </>)}
    </div>
  )
}

export default List
