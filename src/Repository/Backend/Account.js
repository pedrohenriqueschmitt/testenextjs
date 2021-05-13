import API from '../../Backend_API';

export async function login(user) {
    var r;
    
    await API.post(`/v1/account/login`, user)
      .then(function (response) {
        r = { sucesso:true, data: response.data};
      })
      .catch(error => {
        r = { sucesso:false, data: error.response.data};
    });
    return r
}

export async function creatUser(user){
    var r;
    
    await API.post(`/v1/account/CreatUser`, user)
      .then(function (response) {
        r = { sucesso:true, data: response.data};
      })
      .catch(error => {
        r = { sucesso:false, data: error.response.data};
    });
    return r
}