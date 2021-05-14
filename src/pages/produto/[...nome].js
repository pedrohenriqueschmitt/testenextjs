import React from 'react';
import Head from 'next/head'
import Produto from '../../components/ProdutoDetalhe';
import If from '../../components/If';
import { carregarProdutoDetalhe } from '../../Repository/CISS/produtos';
import Typography from '@material-ui/core/Typography';

function ProdutoDetalhe(props) {
  const [cor, setCor] = React.useState('');
  const [tamanho, setTamanho] = React.useState('');

  const handleChange_Cor = (event) => {
    setCor(event.target.value);
  }
  const handleChange_Tamanho = (event) => {
    setTamanho(event.target.value);
  }

  if (props.erro)
  {
    return (
      <>
        <Head>
          <title>Produto</title>
        </Head>
        <Typography gutterBottom variant="h6" style={{ textAlign: 'center' }}>{props.erro}</Typography>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{props.produtos.nome}</title>
      </Head>
      
        <Produto
          cor={cor} handleChange_Cor={handleChange_Cor}
          tamanho={tamanho} handleChange_Tamanho={handleChange_Tamanho}
          onClickComprar={() => history.push("/identificacao")}
          id={props.produtos.id}
          nome={props.produtos.nome}
          descricao={props.produtos.descricao}
          precoPrazo={props.produtos.precoPrazo}
          precoDebito={props.produtos.precoDebito}
          precoTransfBancaria={props.produtos.precoTransfBancaria}
          imagem={'erro.png'}
        />
    </>
  );
}

export async function getServerSideProps(props) {
  var { nome, id } = props.query;
  
  if (Array.isArray(nome) && nome.length > 1) {
    nome = '';
  }
  console.log(nome+' --- ' + id);
  const data = await carregarProdutoDetalhe(nome, id);

  return {
    props: data,
  }
}

export default ProdutoDetalhe;

