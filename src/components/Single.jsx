import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Single() {
    const [single, setSingle] = useState([])
    const params = useParams()
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then((res)=>{return res.json()})
        .then((data)=>{setSingle(data)})
    },[])
  return (
    <>
    <h1>{params.id}</h1>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 350 }}
        image={single.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {single.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {single.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          price : {single.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating : {single.rating?.rate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Add to Cart</Button>
      </CardActions>
    </Card>
    </>
  )
}
