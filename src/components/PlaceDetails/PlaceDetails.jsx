import React from 'react'
import {Box,Typography,Card,CardMedia,Button,CardContent,CardActions,Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './style';

const PlaceDetails = ({place}) => {
  const classes=useStyles();
  return (
    <Card elevation={6}>
      <CardMedia style={{height:300}} 
      image={place.photo? place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      title={place.name} 
       >

      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box className={classes.box}>
          <Rating value={Number(place.rating)}></Rating>
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box className={classes.box}>
          <Typography  variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box className={classes.box}>
          <Typography  variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {
          place?.awards?.map((award)=>(
            <Box className={classes.awards}>
                <img src={award.images.small} alt={award.display_name}/>
                <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
            </Box>
          ))
        }
        {
          place?.cuisine?.map(({name})=>(
              <Chip  key={name} size='small' label={name} className={classes.chip}/>
                
             
          ))
        }
        {
          place?.address && (
            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
              <LocationOnIcon/>{place.address}
            </Typography>
          )
        }
        {
          place?.phone && (
            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
              <PhoneIcon/>{place.phone}
            </Typography>
          )
        }
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>

    </Card>
  )
}

export default PlaceDetails
