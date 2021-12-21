const express = require('express');
const router = express.Router();
const Blog = require('../models/blog_generalData');
const service = require('../services/service_salesman');

// get all salesmen
router.get('/', async (req, res) => {
    try {
       const response = await service.fetchAllSalesmen(); 
       res.status(200).send(response);
    } catch(error) {
        res.status(401).json({'success': false});
    }
});

// get a salesman with sid
router.get('/:sid', async (req, res) => {
    const sid = req.params
    try {
        const response = await service.fetchSalesmanBySid(sid);
        res.status(200).send(response);
    } catch(error) {
        res.status(401).json({'success': false});
    }
});

// post a salesman
router.post('/', async (req, res) => {
    try {
        service.createSalesMan (req.body);
        res.status(200).json({'success': true});
    } catch(error) {
        res.status(401).json({'success': false});
    }
});

// update a salesman
router.put('/:sid', (req, res) => {
    
    const sid = req.params.sid

    Blog.findOneAndReplace(sid, {
        sid: req.body.sid,
        name: req.body.name,
        department: req.body.department,
    })
    .then(result => {

        res.status(200).json({"success": true})
        //res.status(200).send(result)
    })
    .catch(error => {
        console.log(error)
        res.status(401).send(error)
    })
})

// delete a salesman by sid
router.delete('/:sid', (req, res) => {
    const sid = req.params
    Blog.find(sid).deleteOne()
    .then(result => {
         res.status(200).json({"success": true})
    })
    .catch(error => {
        console.log(error)
         res.status(401).send(error)
    })
})

module.exports = router