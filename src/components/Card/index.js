import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://img.elo7.com.br/product/zoom/26F23BE/3-mts-fita-antiderrapante-branca-p-pisos-residencia-festas-refletiva.jpg"
          title="Contemplative Reptile"
        />
         <Typography gutterBottom variant="h5" component="h2">
            Pisos
          </Typography>
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Pisos
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Pisos e porcelanatos.
          </Typography>
        </CardContent> */}
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}