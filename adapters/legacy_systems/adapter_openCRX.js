const {default: axios} = require('axios');

// base url to openCRX
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';

const credentials = {
    username:'guest',
    password:'guest',
};

const config = {
    headers: {
        'Accept': 'application/json',
    },
    auth: credentials,
};

module.exports = {
    getProducts: async () => {
        try {
            const res = await axios.get(`${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`, config);
    
            const {data} = res;
            //console.log(data);
            const {"@total": total, objects} = data;
            let items = objects.map((item) => {
                return {
                    id: item.identity.split("/").at(-1),
                    name: item.name,
                    productNumber: item.productNumber,  
                    description: item.description,
                }; 
            });
            console.log(total, items);
            return items;
    
        } catch (error) {
            console.log(error);
        }
    },
    
    
    getCustomers: async () => {
        try{
           const res = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config); 
           const {data} = res;
           const {"@total": total, objects} = data;
           let entities = [];
    
           let items = objects.map((item) => {
               let {"@type" : type} = item;
               type = type.split(".").at(-1);
    
               if (type === "LegalEntity") {
                  let entity = {
                    name: item.fullName,
                    id: item.identity.split("/").at(-1),
                    accountRating: item.accountRating,
                   };
    
                   entities.push(entity);
                   return entity;
               }
           });
    
           //console.log(entities);
           return entities;
    
        } catch (error) {
            console.log(error);
        }
        
    },

    // getPositions: async () => {
    //     try {
    //         const res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DXSKIH1RCHD5H2MA4T2TYJFL/position`, config); 
    //         const {data} = res;
    //         console.log(data);

    //     } catch (error) {
    //         return error;
    //     }
    // },
    
}

async function getPositions () {
    try {
        const res = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/9DXSKIH1RCHD5H2MA4T2TYJFL/position`, config); 
        const {data} = res;
        //console.log(data);
        const {objects} = data;

        let items = objects.map((item) => {
            let position = {
                pricePerUnit: item.pricePerUnit,
                amout: item.amout,
                description: item.productDescription,
                
            }
        })
    } catch (error) {
        return error;
    }
}

getPositions();


