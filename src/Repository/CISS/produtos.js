import API from '../../CISS_API';
import _, { forEach } from 'underscore';
import axios from 'axios';
import qs from 'querystring';

const porcentagemDebito = 0.03;
const porcentagemAvista = 0.065;

const fetchProduto = async (filtro) => await API.post(`/cisspoder-service/cad_produtos`, filtro).then((response) => ({
    error: false,
    data: response.data,
  }))
  .catch((e) => ({
      error: true,
      message: e.message,
      dataError: e.response.data.error
    })
  );
const fetchImagem = async (idProduto) => await API.get(`/go/produtos/`+idProduto+`/imagem`, {}).then((response) => ({
    error: false,
    data: response.data,
  }))
  .catch((e) => ({
      error: true,
      message: e.message,
      dataError: e.response.data.error,
      e: e
    })
  );
const fetchPreco = async (idsProdutos) => await API.post(`/cisspoder-service/precos_custos_produtos_empresa`, {
    "clausulas":[
        {
            "campo": "flaginativo",
            "valor": "F",
            "operador": "IGUAL"
        },
        {
            "campo": "idempresa",
            "valor": "1",
            "operador": "IGUAL"
        },
        {
            "campo": "idproduto",
            "valor": idsProdutos,
            "operador": "IN"
        }
    ],
    "page": 1
}).then((response) => ({
    error: false,
    data: response.data,
  }))
  .catch((e) => ({
      error: true,
      message: e.message,
      dataError: e.response.data.error
    })
  );
const buscaToken = async () => 
    await axios.post('http://DTUDO.DYNDNS.INFO:4664/cisspoder-auth/oauth/token',qs.stringify(
    {
        //password:"123",
        //username:"PEDRO",
        password:process.env.CISS_SENHA,
        username:process.env.CISS_USUARIO,
        grant_type: "password",
        client_secret:"poder7547",
        client_id: "cisspoder-oauth"
    }),{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => (
        response.data.access_token
    )).catch((e) => {console.log(e)});


export async function carregarProdutos(categoria, buscarPor, pagina=1) {
    
    const token = await buscaToken();
    API.defaults.headers.common['Authorization'] = 'Bearer '+token;

    var titulo = "Produtos"
    if (categoria)
        titulo = categoria;
    if (buscarPor)
        titulo = `Resultado de "${buscarPor}"`;
    
    const data = await fetchProduto({
        "clausulas":[
            {
                "campo": "flaginativo",
                "valor": "F",
                "operador": "IGUAL"
            },
            {
                "campo": "flagbloqueiavenda",
                "valor": "F",
                "operador": "IGUAL"
            },
            (categoria? {
                "campo": "descrsecao",
                "valor": categoria,
                "operador": "IGUAL"
            }:{
                "campo": "descrsecao",
                "valor": "USO LOJA",
                "operador": "DIFERENTE"
            }),
            (buscarPor? {
                "campo": "descrcomproduto",
                "valor": buscarPor,
                "operador": "LIKE"
            }:{})
        ],
        "page": pagina
    });
    
    if (data.error)
    {
        return { erro: 'Não possível carregar os produtos. Tente mais tarde.' };
    }

    const produtos = data.data.data.map(function(prod) {
        return {
          "id": prod.idproduto,
          "nome": prod.descrresproduto,
          "precoPrazo": "",
          "precoDebito": "",
          "precoTransfBancaria": "",
          "imagem": ""
        };
      });

    // Buscar os precos dos produtos
    var idsProdutos = _.map(produtos, (p) => p.id);
    var precos = await fetchPreco(idsProdutos);
    API.defaults.headers.common['Authorization'] = 'Bearer '+token;
    //prod.imagem = imagem.data.data.imProduto;
        
    for(var chave=0; chave<produtos.length; chave++) {
        const imagem = await fetchImagem(produtos[chave].id);
        
        try{
            produtos[chave].imagem = imagem.data.data.imProduto;
            if (produtos[chave].imagem == undefined)
            produtos[chave].imagem = '';
        }catch{
            produtos[chave].imagem = '';
        }
    }

    // Verificar preços, e adiciona aos produtos
    _.each(produtos, (prod) => {
        var preco = _.findWhere(precos.data.data, {'idproduto': prod.id});
        
        if (preco){
            if (preco.valprecovarejo>0)
            {
                var p = parseFloat(preco.valprecovarejo);
                prod.precoPrazo = p.toFixed(2).replace('.',',');
                prod.precoDebito = (p-(p*porcentagemDebito)).toFixed(2).replace('.',',');
                prod.precoTransfBancaria = (p-(p*porcentagemAvista)).toFixed(2).replace('.',',');
            }
        }
    })    

    return {
        produtos,
        titulo: titulo,
        hasNext: data.data.hasNext,
        pagina:pagina
      }
}

export async function carregarProdutoDetalhe(nome, id) {
    
    const token = await buscaToken();
    API.defaults.headers.common['Authorization'] = 'Bearer '+token;
    
    var tentativa = 3;
    var data = '';
    while (tentativa > 0)
    {
        if (tentativa == 3)
        {
            data = await fetchProduto({
                "clausulas":[
                    {
                        "campo": "descrresproduto",
                        "valor": nome,
                        "operador": "IGUAL"
                    },
                    {
                        "campo": "flagbloqueiavenda",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                    (id? {
                        "campo": "idproduto",
                        "valor": id,
                        "operador": "IGUAL"
                    }:{}),
                    {
                        "campo": "flaginativo",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                ],
                "page": 1
            });
        }
        if (tentativa == 2 && id){
            data = await fetchProduto({
                "clausulas":[
                    {
                        "campo": "flagbloqueiavenda",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                    (id? {
                        "campo": "idproduto",
                        "valor": id,
                        "operador": "IGUAL"
                    }:{}),
                    {
                        "campo": "flaginativo",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                ],
                "page": 1
            });
        }
        if (tentativa == 1)
        {
            data = await fetchProduto({
                "clausulas":[
                    {
                        "campo": "descrresproduto",
                        "valor": nome,
                        "operador": "IGUAL"
                    },
                    {
                        "campo": "flagbloqueiavenda",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                    {
                        "campo": "flaginativo",
                        "valor": "F",
                        "operador": "IGUAL"
                    },
                ],
                "page": 1
            });
        }

        if (data.error)
        {
            return { erro: 'Não possível carregar o produto. Tente mais tarde.' };
        }

        if (data.data.data.length > 0)
            tentativa = 0;
        else 
            tentativa--;

    }

    

    const produtos = data.data.data.map(function(prod) {
        return {
          "id": prod.idproduto,
          "nome": prod.descrresproduto,
          "descricao": prod.descrcomproduto,
          "precoPrazo": "",
          "precoDebito": "",
          "precoTransfBancaria": "",
          "imagem": "https://www.casasaopedro.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/i/pintapisoazul3_6.jpg"
        };
      });
      
    // Buscar os precos dos produtos
    var idsProdutos = _.map(produtos, (p) => p.id);
    var precos = await fetchPreco(idsProdutos);
    
    // Verificar preços, e adiciona aos produtos
    _.each(produtos, (prod) => {
        var preco = _.findWhere(precos.data.data, {'idproduto': prod.id});
        if (preco){
            if (preco.valprecovarejo>0)
            {
                var p = parseFloat(preco.valprecovarejo);
                prod.precoPrazo = p.toFixed(2).replace('.',',');
                prod.precoDebito = (p-(p*porcentagemDebito)).toFixed(2).replace('.',',');
                prod.precoTransfBancaria = (p-(p*porcentagemAvista)).toFixed(2).replace('.',',');
            }
        }
    })    
    
    if (produtos.length > 1 || produtos.length == 0)
        return { erro: 'Não possível encontrar o produto.' };

    return {
        produtos:produtos[0]
      }
}