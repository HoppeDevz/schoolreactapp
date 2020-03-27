import React from 'react';
import './styles.css';
import { useState, useEffect } from  'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowUp } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';


export default function Register() {

    const [users3em, set3m] = useState([]);
    const [users2em, set2m] = useState([]);
    const [users1em, set1m] = useState([]);

    useEffect(() => {
        api.post("getAccountsbyGrid", { grid: "1em" })
        .then(response => {
            set1m(response.data.data)
        }).catch(err => {
            //console.log(err)
        })
    }, [])


    useEffect(() => {
        api.post("getAccountsbyGrid", { grid: "2em" })
        .then(response => {
            set2m(response.data.data)
        }).catch(err => {
            //console.log(err)
        })
    }, [])


    useEffect(() => {
        api.post("getAccountsbyGrid", { grid: "3em" })
        .then(response => {
            set3m(response.data.data)
        }).catch(err => {
            //console.log(err)
        })
    }, [])

    //console.log(users3em)


    const history = useHistory();

    function NavRegister(e) {
        e.preventDefault();
        history.push('/dashboard')
    }

    function NavList(e) {
        e.preventDefault();
        history.push('/listRegisters')
    }

    function NavAddTask(e) {
        e.preventDefault();
        history.push("/addtask");
    }

    function LogoutHandler(e) {
        e.preventDefault();
        localStorage.clear();
        history.push("/")
        //test
    }

    return (
        <div>

        <div className="header">
            <h1>Colégio Colibri</h1>
            <h2 className='logoutitle' onClick={LogoutHandler} >Sair<FiLogOut size={16} color='#444' /> </h2>
            <ul>
                <li onClick={NavRegister}>Cadastar aluno</li>
                <li onClick={NavList}>Lista de alunos</li>
                <li onClick={NavAddTask}>Adicionar Tarefa</li>
            </ul>
        </div>
        
        <div className="listregister3em">
            <h2>3 Ano do Ensino Médio</h2>
            <ul>
                {users3em.map(user  => (
                    <div className='userinfo'>
                        <li>{user.name + ' ' + user.lastname}</li>
                        <li>{user.user_email}</li>
                    </div>
                ))}
            </ul>
        </div>

        <div className="listregister3em">
            <h2>2 Ano do Ensino Médio</h2>
            <ul>
                {users2em.map(user  => (
                    <div className='userinfo'>
                        <li>{user.name + ' ' + user.lastname}</li>
                        <li>{user.user_email}</li>
                    </div>
                ))}
            </ul>
        </div>

        <div className="listregister3em">
            <h2>1 Ano do Ensino Médio</h2>
            <ul>
                {users1em.map(user  => (
                    <div className='userinfo'>
                        <li>{user.name + ' ' + user.lastname}</li>
                        <li>{user.user_email}</li>
                    </div>
                ))}
            </ul>
        </div>

        

        </div>
    )
}   