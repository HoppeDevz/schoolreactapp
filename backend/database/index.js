const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

var con = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  });

  con.query('SELECT 1', function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        console.log(`Conectado com o banco de dados!`)
    }

});

exports.CreateNewAccount = (data) => {
    const { name, lastname, password, user_email, grid } = data

    const hash_password = bcrypt.hashSync(password, 10)
    const newdata = {
        name, lastname, hash_password, user_email, grid
    }
    
    con.query(`INSERT INTO users_account (name, lastname, password, user_email, grid) VALUES ("${name}", "${lastname}", "${hash_password}", "${user_email}", "${grid}")`);

    return newdata
}


exports.LoginAccount = (data) => {
    const { user_email, password } = data
    var exist_account = false
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users_account`, (error, results, fields) => {
            for (var i = 0; i <= results.length; i++) {
                if (results[i]) {
                    if ( user_email == results[i].user_email) {
                        if (bcrypt.compareSync(password, results[i].password)) {
                            exist_account = true
                        }
                    }
                }
            }
            if (exist_account) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

exports.getAccountInfo = (data) => {
    const { user_email } = data
    console.log(user_email)
    return new Promise((resolve, reject ) => {
        con.query(`SELECT * FROM users_account WHERE user_email = "${user_email}"`, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                if (results) {
                    resolve(results)
                    console.log(results)
                }
            }
        })
    });
} 

exports.createTask = (data) => {
    const { title, description, value, grid, account_posted } = data
    con.query(`INSERT INTO tasks (title, description, value, grid, account_posted) VALUES ("${title}", "${description}", "${value}", "${grid}", "${account_posted}")`);
    return true
}

exports.deleteTask = (id) => { 
    con.query(`DELETE FROM tasks WHERE id = ${id}`);
    return true
}

exports.getTasksByGrid = (grid) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM tasks WHERE grid = "${grid}"`, (error, results, fields) => {
            if (error) {
                reject(error)
                console.log(error)
            } else {
                if (results) {
                    resolve(results)
                }
            }
        })
    })
}

exports.checkAdminAccount = (data) =>  {
    const { username, password }  = data

    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM admin_accounts`, (error, results, fields) => {
            var exist_account = false
            var account_id = 0
            for (var i = 0; i <= results.length; i++) {
                if (results[i]) {
                    //console.log(results[i])
                    if (username == results[i].username) {
                        exist_account = true
                        account_id = results[i].id
                    }
                }
            }

            if(error) {
                reject(error)
            }

            if (exist_account) {
                resolve(account_id)
            } else {
                resolve(false)
            }
        });
    });
}

exports.getAccountsbyGrid = (grid)  => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users_account WHERE grid = "${grid}"`, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                if (results) {
                    resolve(results)
                }
            }
        });
    });
}

exports.getTasksById = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM tasks WHERE account_posted = "${id}"`, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            resolve(results)
            console.log(results)
        });
    })
}