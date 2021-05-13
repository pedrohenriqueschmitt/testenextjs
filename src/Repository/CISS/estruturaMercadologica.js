import API from '../../CISS_API';
import _ from 'underscore';
import axios from 'axios';
import qs from 'querystring';
import { buscaToken } from './token';

const fetchSecao = async (filtro) => await API.post(`/cisspoder-service/estrutura_mercadologica`, filtro).then((response) => ({
    error: false,
    data: response.data,
  }))
  .catch((e) => ({
      error: true,
      message: e.message,
      dataError: e.response.data.error
    })
  );

export async function carregarSecoes() {
    
    const token = await buscaToken();
    API.defaults.headers.common['Authorization'] = 'Bearer '+token;

    const data = await fetchSecao({
        "clausulas":[
            {
                "campo": "tipocategoria",
                "valor": "S",
                "operador": "IGUAL",
                "operadorlogico": "AND"
            },
            {
              "campo": "descrcategoria",
              "valor": "USO LOJA",
              "operador": "DIFERENTE",
              "operadorlogico": "AND"
            }
        ],
        "page": 1
    });

    if (data.error)
    {
        return { erro: 'Não possível carregar os produtos. Tente mais tarde.' };
    }

    
    const secoes = data.data.data.map(function(secao) {
        return {
          "id": secao.idcategoria,
          "descricao": secao.descrcategoria,
          "idnivelanterior": secao.idnivelanterior?secao.idnivelanterior:''
        };
      });

    return secoes;
}