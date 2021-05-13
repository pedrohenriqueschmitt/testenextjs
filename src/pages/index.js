import Head from 'next/head'
import Banner from '../components/Banner';
import Help from '../components/Help';
import Secoes from '../components/Secoes';
import ListProdutos from '../components/ListProdutos';
import If from '../components/If';

import {carregarSecoes} from '../Repository/CISS/estruturaMercadologica';
import {carregarProdutos} from '../Repository/CISS/produtos';

function Home(props) {
  return (<>
    <Head>
      <title>DTudo</title>
    </Head>
    <>
      <Banner /> 
      <Help />
      <Secoes secoes={props.secoes} />
      <ListProdutos produtos={props.produtos.produtos} titulo={props.produtos.titulo}/>
    </>
  </>);
}

export async function getServerSideProps() {
    
  const secoes = await carregarSecoes();
  //console.log(secoes);
  const produtos = await carregarProdutos('BALCAO DE BANHEIRO', '');

  return {
    props: {
      produtos,
      secoes
    },
  }
}

export default Home
