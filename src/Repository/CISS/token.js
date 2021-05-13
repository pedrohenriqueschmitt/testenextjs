import axios from 'axios';
import qs from 'querystring';

 const busca = async () => 
    await axios.post(process.env.CISS_ENDERECO_TOKEN,qs.stringify(
    {
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


export async function buscaToken() {
    
    const token = await busca();
    
    return token;
}