import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import If from '../If';
//import Logo_DTudo from '../../img/Logo_DTudo.png';
import Hidden from '@material-ui/core/Hidden';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from 'next/link'
import Cookie from "js-cookie";
import { AuthToken } from "../../services/auth_token";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textTransform: 'none'
  },
  div:{
    paddingTop: '6px',
    paddingBottom: '0px',
    right: '0px',
    bottom: '0px',
    position: 'absolute'
  }
}));

const handleClick = () => {
  // do something meaningful, Promises, if/else, whatever, and then
  window.location.assign('https://wa.me/5547991490220?text=Olá,%20estou%20precisando%20de%20');
}

export default function ButtonAppBar(props) {
  const classes = useStyles();
  console.log(AuthToken.getToken());

  return (
    <div className={classes.root}>
       <AppBar position="fixed" color="primary" elevation={0} >
        <Toolbar>
          
         {/*  <img  src={Logo_DTudo} width='150' height='50' /> */}
         {/*  <Typography variant="h6" className={classes.title} >
            Bonatão
          </Typography> */}
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <SearchIcon />
          </IconButton> */}
          <div className={classes.div}>
          <Hidden only={['md', 'sm', 'xs']}>
            <Link href="/">
              <Button color="inherit" >
                <Grid container direction="column" justify="center" alignItems="center">
                  <SearchIcon />
                  <Typography variant="body1" className={classes.title} >
                  Buscar
                  </Typography>
                </Grid>
              </Button>
            </Link>
            <Link href="/produtos">
              <Button color="inherit" >
                <Grid container direction="column" justify="center" alignItems="center">
                  <AddShoppingCartIcon />
                  <Typography variant="body1" className={classes.title} >
                  Produtos
                  </Typography>
                </Grid>
              </Button>
            </Link>
            {AuthToken.getToken().isAuthenticated? 
              <Link href="/meusdados">
                <Button color="inherit" >
                  <Grid container direction="column" justify="center" alignItems="center">
                    <PersonIcon />
                    <Typography variant="body1" className={classes.title} >
                      Meus dados
                    </Typography>
                  </Grid>
                </Button>
              </Link>
              :
              <Link href="/login">
                <Button color="inherit" >
                  <Grid container direction="column" justify="center" alignItems="center">
                    <PersonIcon />
                    <Typography variant="body1" className={classes.title} >
                      Entrar
                    </Typography>
                  </Grid>
                </Button>
              </Link>
            }
          </Hidden>
          <Button color="inherit" onClick={handleClick.bind(this)}>
            <Grid container direction="column" justify="center" alignItems="center">
              <WhatsAppIcon />
              <Typography variant="body1" className={classes.title} >
                Fale conosco 
              </Typography>
            </Grid>
          </Button>
          
          </div>
          
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
        <If value={props.loading}>
        <LinearProgress color="primary"/>
        </If>
      </AppBar>
    </div>
  );
}