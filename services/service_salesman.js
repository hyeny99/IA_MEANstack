const Blog = require('../models/blog_generalData');
const orangeHRM = require('../adapters/legacy_systems/adapter_orangeHRM');
 
module.exports = {

    // save employees (orangeHRM) to db
    saveEmployees: async function () {
        try {
            let employees = await orangeHRM.getEmployees();
            let salesmen = [];
            employees.forEach(employee => {
                if(employee.jobTitle == "Senior Salesman"){
                    let salesman = {
                        sid: employee.employeeId,
                        name: employee.fullName,
                        department: employee.unit,
                    }
                    salesmen.push(salesman);
                }
            });
            
            await (Blog.insertMany(salesmen)).insertedId;
            return salesmen;
    
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    fetchAllSalesmen: async function (){
        try {
            const res = await Blog.find().sort({ createdAt: 1 });
            return res;
        } catch(error) {
            return error;
        }
    },

    fetchSalesmanBySid: async function(sid) {
        try {
            const res = Blog.find(sid);
            return res;
        } catch(error){
            return error;
        }
    },

    createSalesMan: async function (body) {
        const blog = new Blog({
            sid: body.sid,
            name: body.name,
            department: body.department,
        })
        try {
            await blog.save();
        } catch(error){
            return error;
        }
    }

}





