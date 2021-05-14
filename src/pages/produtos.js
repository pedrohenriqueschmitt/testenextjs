import Head from 'next/head';
import ListProdutos from '../components/ListProdutos';
import If from '../components/If';
import {carregarProdutos} from '../Repository/CISS/produtos';
import Typography from '@material-ui/core/Typography';
  
import { useRouter } from 'next/router'

function Produtos(props) {

  return (
    <>
      <If value={props.erro}>
          <Typography gutterBottom variant="h6" style={{textAlign: 'center'}}>{props.erro}</Typography>
      </If>
      <If value={!props.erro}>
        <Head>
          <title>{props.titulo}</title>
        </Head>
        <ListProdutos produtos={props.produtos} titulo={props.titulo} hasNext={props.hasNext} pageCurrent={props.pagina} urlNext={props.urlNext} urlBack={props.urlBack}/>
      </If> 
    </>
  );
}

function montarURL(url, param, valor)
{
  var URLFake = 'https://teste';
  var href = new URL(URLFake + url);
  href.searchParams.set(param, valor);
  return href.toString().replace(URLFake, '');
}

/*export async function getStaticProps(props) {
  console.log(props);
  return {
    props: {},
  }
}*/

export async function getServerSideProps(props) {
 var { categoria, buscarPor, page } = props.query;

 //console.log(props.query);
  var url = '/produtos?' + Object.keys(props.query).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(props.query[k])
  }).join('&')

  if (!page)
    page = 1
  
    //console.log(page);
  //console.log(url);
  

  const data = await carregarProdutos(categoria, buscarPor, page);
  
  data.urlNext = montarURL(url, 'page', (parseInt(data.pagina)+1));
  data.urlBack = montarURL(url, 'page', (parseInt(data.pagina)-1));
 
  console.log(data);
  return {
    props: data,
  }
}

export default Produtos;
