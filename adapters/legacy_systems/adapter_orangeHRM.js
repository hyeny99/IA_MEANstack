const {default: axios} = require('axios');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

const credentials = {
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'demouser',
    password: '*Safb02da42Demo$',
};

const config = {
    headers: {
        'Accept': 'application/json',
    },
};

async function getBearerToken() {

    let res = await axios.post(`${baseUrl}/oauth/issueToken`, credentials, config);    
    let token = res.data.access_token;
    //console.log(token);
    return token;
}

module.exports = {

    getEmployees: async function() {
        let token = await getBearerToken();
        try{
            const res = await axios.get(`${baseUrl}/api/v1/employee/search`, {headers: {'Authorization': `Bearer ${token}`}});
            const employees = res.data.data;
            //console.log(employees);
            return employees;

        } catch(error) {
            console.log(error);
        }
    }


};



