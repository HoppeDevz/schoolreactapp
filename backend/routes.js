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
    const bill = req.body.bill

    const data = {
        name, lastname, password, user_email, grid, bill
    }

    database.CreateNewAccount(data).then(response => {
        res.status(200).send({
            created_account: true
        })
    }).catch(err => {
        res.status(200).send({
            created_account: false
        })
    })

})

router.post('/loginAccount', (req, res)  => {
    const data = {
        user_email: req.body.user_email,
        password: req.body.password
    }

    const { user_email, password } = data
    if (user_email && password ) {
        console.log(data)
        database.LoginAccount(data)
        .then(response => {
            console.log(response)
            if (response) {
                res.status(200).send({
                    response
                })
            } else {
                res.status(200).send({
                    response
                })
            }   
        }).catch(err => {
            res.status(400).send({
                response
            })
        })
    } else {
        res.status(400).send({
            response
        })
    }
    
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

router.post("/getBillFromId", (req, res) => {
    const { id } = req.body
    database.getBillFromId(id)
    .then(data => {
        res.status(200).send({
            data
        })
    })
    .catch(err => {
        res.status(400).send({
            err
        })
    })
})

router.post("/changeBillNotes", (req, res) => {
    const data = {
        id: req.body.id , bill_id: req.body.bill_id, discipline: req.body.discipline, value: req.body.value
    }

    database.changeBillNotes(data)
    .then(response => {
        res.status(200).send({
            changed_note: true
        })
    }).catch(err => {
        res.status(400).send({
            changed_note: false,
            error: true
        })
    })
})

router.post("/changeAvatarURL", (req, res) => {
    const data = {
        id: req.body.id,
        uri: req.body.uri
    }

    console.log(data)

    const { id, uri } = data

    database.changeAvatarURL(data)
    .then(response => {
        res.status(200).send({
            changed_photo: true,
            new_uri: uri
        })
    })
    .catch(err => {
        console.log(error)
        res.status(400).send({
            changed_photo: false,
            error : true
        })
    })
})

module.exports = router

