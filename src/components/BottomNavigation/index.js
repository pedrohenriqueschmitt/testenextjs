import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'next/link';
import { withRouter } from 'next/router'


const BottomNavBar = props =>{

    return (
        <>
        <BottomNavigation value={props.router.pathname} showLabels={true}>
          <BottomNavigationAction label="Buscar" value="/" icon={<SearchIcon />} component={Link} href='/'/>
          <BottomNavigationAction label="Produtos" value="/produtos" icon={<AddShoppingCartIcon /> } component={Link} href='/produtos'/>                
          {/* <BottomNavigationAction label="Meu pedido" value="/produtos" icon={<AddShoppingCartIcon /> } component={Link} href='/produtos'/>
          
           */}
          <BottomNavigationAction label="Entrar" value="/login" icon={<PersonIcon />} component={Link} href='/login'/>
          
        </BottomNavigation>
        </>
      );
}

export default withRouter(BottomNavBar)