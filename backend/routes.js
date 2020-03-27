const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const database = require('./database');
const bcrypt = require('bcrypt');


router.use(express.json())
dotenv.config();

router.post('/createAccount', (req, res) => {
    const name = req.body.name
    const lastname = req.body.lastname
    const password = req.body.password
    const user_email = req.body.user_email
    const grid = req.body.grid

    const data = {
        name, lastname, password, user_email, grid
    }

    const new_data = database.CreateNewAccount(data)

    res.status(200).send({
        new_data
    })

})

router.post('/loginAccount', (req, res)  => {
    const data = {
        user_email: req.body.user_email,
        password: req.body.password
    }
    database.LoginAccount(data)
    .then(response => {
        res.status(200).send({
            exist_account: true
        })
    }).catch(err => {
        res.status(400).send({
            exist_account: false
        })
    })
});

router.post('/getAccountInfo', (req, res) => {
    const data = {
        user_email: req.body.user_email
    }

    database.getAccountInfo(data)
    .then(data => {
        res.status(200).send({
            data
        })
    }).catch(err => {
        res.status(400).send({
            error: true
        })
    })

})


router.post("/createTask", (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        value: req.body.value,
        grid: req.body.grid,
        account_posted: req.body.account_posted
    }

    if (database.createTask(data)) {
        res.status(200).send({
            task_created: true
        }) 
    } else {
        res.status(400).send({
            task_created: false
        })
    }
});

router.post("/deleteTask", (req, res) => {
    const id = parseInt(req.body.id)
    if (database.deleteTask(id)) {
        res.status(200).send({
            deleted_task: true
        })
    } else {
        res.status(400).send({
            deleted_task: false
        })
    }
});

router.post("/getTasksByGrid", (req, res) => {
    const { grid : serie } = req.body
    console.log(serie)
    database.getTasksByGrid(serie).then(data => {
        res.status(200).send({
            data
        })
    }).catch(err =>{
        res.status(400).send({
            error: 'Error'
        })
    })
});

router.post("/checkAdminAccount", (req, res) => {
    const data = req.body
    console.log(data)
    database.checkAdminAccount(data).then(data => {
        res.status(200).send({
            exist_account : true,
            data
        })
    }).catch(err => {
        res.status(400).send({
            error: true
        })
    })
})

router.post("/getAccountsbyGrid", (req, res) => {
    const { grid: serie } = req.body
    database.getAccountsbyGrid(serie).then(data => {
        res.status(200).send({
            data
        })
    }).catch(err => {
        res.status(400).send({
            error: true
        })
    })
})

router.post("/getTasksById", (req, res) => {
    const id = req.body.id

    database.getTasksById(id)
    .then(data => {
        res.status(200).send({
            data
        })
    }).catch(err => {
        err
    })

});

module.exports = router

