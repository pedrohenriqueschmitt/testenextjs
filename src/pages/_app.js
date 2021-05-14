import { useRouter } from 'next/router'
import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import theme from '../config/theme';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import * as gtag from '../lib/gtag';
import FacebookPixel from '../Facebook/Pixel';
import { Amplify } from "aws-amplify";
//import awsExports from "../aws-exports";

//Amplify.configure({ ...awsExports, ssr: true });

const APP_NAME = 'next-pwa example'
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  

  
  React.useEffect(() => {
    

    router.events.on('routeChangeStart', (url) => {
      setLoading(true);
    })

    router.events.on('routeChangeComplete', (url) => {
      setLoading(false);
      gtag.pageview(url);
    })

    router.events.off('routeChangeComplete', (url) => {
      gtag.pageview(url);
    })

    router.events.on('routeChangeError', (url) => {
      setLoading(false);
    })

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, [router.events]);

  return (
    <FacebookPixel>
    <React.Fragment>
    
      <Head>
        <title>DTudo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
          <meta name="theme-color" content={theme.palette.primary.main} />
          
      </Head>

      <ThemeProvider theme={theme}>
        
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppBar loading={loading} />

        <Toolbar />

        <Box style={{ paddingBottom: '60px', paddingTop: '0px' }}>
          <Component {...pageProps} />
        </Box>

        <footer style={{ paddingBottom: '60px', paddingTop: '0px' }}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Loja DTudo Materiais de construção
            </Typography>
            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
            Comercial kd Ltda - CNPJ: 12.942.657/0001-57 - Endereço: Rua Francisco Vahldieck, 1911, sala A, bairro Fortaleza, Blumenau - SC - CEP: 89057-000
            </Typography>
            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
            Fale conosco: <Link href="mailto:contato@lojadtudo.com.br">contato@lojadtudo.com.br</Link>
            </Typography>
            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
            Telefone: <Link href="tel:(47) 3339-0000">(47) 3339-0000</Link>
            </Typography>
          <Copyright />
        </footer>

        <Footer />
      </ThemeProvider>
     
    </React.Fragment>
    </FacebookPixel>
  );
}

function Copyright() {
  return (
    <>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Loja DTudo Materiais de construção – Todos os direitos reservados'}
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
    {'Desenvolvido por '}
    <Link color="inherit" href="https://www.linkedin.com/in/pedrohenriqueschmitt/">
      Pedro Henrique Schmitt
      </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
  </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};