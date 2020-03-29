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

    return new Promise((resolve, reject) => {

    const { name, lastname, password, user_email, grid, bill } = data
    
    con.query(`SELECT * FROM users_account`, (error, results, fields) => {
        var exist_account = false
        for (var i = 0; i <= results.length; i++) {
            if (results[i]) {
                if (results[i].user_email == user_email ) {
                    exist_account = true
                    reject("ExistAccount")
                }
            }
        }

    console.log(JSON.parse(data.bill))

    const hash_password = bcrypt.hashSync(password, 10)
    const newdata = {
        name, lastname, hash_password, user_email, grid
    }
    
    if (!exist_account) {
        con.query(`INSERT INTO users_account (name, lastname, password, user_email, grid, bill) VALUES ("${name}", "${lastname}", "${hash_password}", "${user_email}", "${grid}", '${bill}' )`);


        resolve("CreatedAccountSucess")
    }

    })
    

    })
    
}


exports.LoginAccount = (data) => {
    const { user_email, password } = data
    return new Promise((resolve, reject) => {

        con.query(`SELECT * FROM users_account`, (error, results, fields) => {
            var exist_account = false
            var account_info = []
            for (var i = 0; i <= results.length; i++) {
                if (results[i]) {
                    if ( user_email == results[i].user_email) {
                        if (bcrypt.compareSync(password, results[i].password)) {
                            exist_account = true
                            account_info.push(results[i])
                        }
                    }
                }
            }

            if (error) {
                reject(false)
            }

            if (exist_account) {
                const data = account_info
                data[0].exist_account = true
                resolve(data)
            } else {
                resolve(false)
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
    con.query(`INSERT INTO tasks (title, description, value, grid, account_posted, date) VALUES ("${title}", "${description}", "${value}", "${grid}", "${account_posted}", "${new Date().toLocaleDateString()}")`);
    return true
}

exports.deleteTask = (id) => { 
    con.query(`DELETE FROM tasks WHERE id = ${id}`);
    return true
}

exports.getTasksByGrid = (grid) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM tasks WHERE grid = "${grid}"`, (error, results, fields) => {
            var data = results
            if (error) {
                reject(error)
                console.log(error)
            } else {
                if (data) {
                    con.query(`SELECT * FROM admin_accounts`, (error, results, fields) => {
                        var admin_accounts = results
                        //console.log(admin_accounts)
                        var response = []
                        data.map(key => {
                            var key_id = key.account_posted
                            //console.log(key_id)
                            for ( var i = 0; i <= admin_accounts.length; i++ ) {
                                if (admin_accounts[i]) {
                                    if (admin_accounts[i].id == key_id ) {
                                        key.account_name = admin_accounts[i].username
                                        response.push(key)
                                        console.log(response)
                                        if ( i == admin_accounts.length - 1) {
                                            resolve(response)
                                        }
                                    }
                                }
                            }
                        })
                    });
                    //resolve(data)
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

exports.getBillFromId = (id) => {
    return new Promise((resolve,reject) => {
        if (id == NaN || id == '' || id == null) {
            resolve([])
        } else {
            con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
    
                //console.log(JSON.parse(results[0].bill))
                resolve(JSON.parse(results[0].bill))
            });
        }
        
    })
}

exports.changeBillNotes = (data) => {
    return new Promise((resolve,reject) => {
        const { id, bill_id, discipline, value } = data
        if (id && bill_id && discipline && value) {
            if (discipline == "math") {
                con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                    const bill = JSON.parse(results[0].bill)
    
                    bill.data[bill_id - 1].math = value
    
                    const bill_string = JSON.stringify(bill)
    
                    con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                    resolve(true)
                })
            } else {
                if (discipline == "physical") {

                    con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                        const bill = JSON.parse(results[0].bill)
        
                        bill.data[bill_id - 1].physical = value
        
                        const bill_string = JSON.stringify(bill)
        
                        con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                        resolve(true)
                    })

                } else {
                    if ( discipline == "chemistry" ) {

                        con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                            const bill = JSON.parse(results[0].bill)
            
                            bill.data[bill_id - 1].chemistry = value
            
                            const bill_string = JSON.stringify(bill)
            
                            con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                            resolve(true)
                        })

                    } else {
                        if ( discipline == "philosophy" ) {

                            con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                const bill = JSON.parse(results[0].bill)
                
                                bill.data[bill_id - 1].philosophy = value
                
                                const bill_string = JSON.stringify(bill)
                
                                con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                resolve(true)
                            })  

                        } else {
                            if ( discipline == "sociology" ) {

                                con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                    const bill = JSON.parse(results[0].bill)
                    
                                    bill.data[bill_id - 1].sociology = value
                    
                                    const bill_string = JSON.stringify(bill)
                    
                                    con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                    resolve(true)
                                })

                            } else {
                                if ( discipline == "essay" ) {

                                    con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                        const bill = JSON.parse(results[0].bill)
                        
                                        bill.data[bill_id - 1].essay = value
                        
                                        const bill_string = JSON.stringify(bill)
                        
                                        con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                        resolve(true)
                                    })

                                } else {
                                    if ( discipline ==  "physical_education" ) {

                                        con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                            const bill = JSON.parse(results[0].bill)
                            
                                            bill.data[bill_id - 1].physical_education = value
                            
                                            const bill_string = JSON.stringify(bill)
                            
                                            con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                            resolve(true)
                                        })

                                    } else {
                                        if ( discipline == "portuguese" ) {

                                            con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                                const bill = JSON.parse(results[0].bill)
                                
                                                bill.data[bill_id - 1].portuguese = value
                                
                                                const bill_string = JSON.stringify(bill)
                                
                                                con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                                resolve(true)
                                            })

                                        } else {
                                            if ( discipline == "literature" ) {

                                                con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                                    const bill = JSON.parse(results[0].bill)
                                    
                                                    bill.data[bill_id - 1].literature = value
                                    
                                                    const bill_string = JSON.stringify(bill)
                                    
                                                    con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                                    resolve(true)
                                                })

                                            } else {
                                                if ( discipline == "english" ) {

                                                    con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                                        const bill = JSON.parse(results[0].bill)
                                        
                                                        bill.data[bill_id - 1].english = value
                                        
                                                        const bill_string = JSON.stringify(bill)
                                        
                                                        con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                                        resolve(true)
                                                    })

                                                } else {
                                                    if ( discipline == "biology" ) {
                                                        
                                                        con.query(`SELECT bill FROM users_account WHERE id = ${id}`, (error, results, fields) => {
                                                            const bill = JSON.parse(results[0].bill)
                                            
                                                            bill.data[bill_id - 1].biology = value
                                            
                                                            const bill_string = JSON.stringify(bill)
                                            
                                                            con.query(`UPDATE users_account SET bill = '${bill_string}' WHERE id = ${id} `)
                                                            resolve(true)
                                                        })

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            reject(false)
        }
        
    })
}

exports.changeAvatarURL = async (data) => {
    return new Promise((resolve, reject) => {
        let result = con.query(`UPDATE users_account SET avatarURL = "${data.uri}" WHERE id = ${data.id}`);
        if (result) {
            resolve(true)
        } else {
            reject(false)
        }
    })
}