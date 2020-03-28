import React from 'react';
import './styles.css';
import { useState } from  'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowUp } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';


export default function Register() {

    const [name, setName] = useState('');
    const [lastname, setLastname] =  useState('');
    const [password, setPassword] = useState('');
    const [user_email, setEmail] = useState('');
    const [grid, setGrid] =  useState('');

    const history = useHistory();

    function RegisterHandler(e) {
        e.preventDefault()
        //console.log()

        const default_bill = {
            data : [

                {
                    id: 1,
                    math: 0,
                    physical: 0,
                    chemistry: 0,

                    philosophy: 0,
                    sociology: 0,
                    essay: 0,

                    physical_education: 0,

                    portuguese: 0,
                    literature: 0,
                    english: 0,
                    biology: 0,
                },

                {
                    id: 2,
                    math: 0,
                    physical: 0,
                    chemistry: 0,

                    philosophy: 0,
                    sociology: 0,
                    essay: 0,

                    physical_education: 0,

                    portuguese: 0,
                    literature: 0,
                    english: 0,
                    biology: 0,
                },

                {
                    id: 3,
                    math: 0,
                    physical: 0,
                    chemistry: 0,

                    philosophy: 0,
                    sociology: 0,
                    essay: 0,

                    physical_education: 0,

                    portuguese: 0,
                    literature: 0,
                    english: 0,
                    biology: 0,
                },

                {
                    id: 4,
                    math: 0,
                    physical: 0,
                    chemistry: 0,

                    philosophy: 0,
                    sociology: 0,
                    essay: 0,

                    physical_education: 0,

                    portuguese: 0,
                    literature: 0,
                    english: 0,
                    biology: 0,
                }

            ]

        }

        //const default_bill = '[{ "math": 0,"physical": 0,"chemistry": 0,"philosophy": 0,"sociology": 0,"essay": 0,"physical_education": 0,"portuguese": 0,"literature": 0,"english": 0,"biology": 0,}]'

        const bill = JSON.stringify(default_bill)

        const data = {
            name, lastname, password, user_email, grid, bill
        }

        if (name != '' && lastname != '' && password != '' && user_email != '' &&  grid != '' ) {
            api.post("createAccount", data)
            .then(response => {
                console.log(response)
                alert(`Aluno cadastrado  com sucesso!`)
            })
        } else {
            alert('Campos Vazios!')
        }
    }

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
    }

    console.log("[localstorage:]", localStorage.getItem("account_id"))

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

        <div className='register-container'>
            
            <div className="title">
                <h1>Registrar Aluno </h1>
                <img src='https://www.pngitem.com/pimgs/m/287-2874255_seller-registration-icon-class-register-icon-png-transparent.png' width='300px' height='300px' />
            </div>

            <form className='register-inputs' onSubmit={RegisterHandler}>
                <input type="text" placeholder='Nome' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Sobrenome'  value={lastname} onChange={e => setLastname(e.target.value)} />
                <input type="text" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
                <input type="email" placeholder='Email' value={user_email} onChange={e => setEmail(e.target.value)} />
                <select value={grid} onChange={e => setGrid(e.target.value)} className='select-grid'>
                    <option value='1em'>1 Ano Ensino Médio</option>
                    <option value='2em'>2 Ano Ensino Médio</option>
                    <option value='3em'>3 Ano Ensino Médio</option>
                    <option value='6ef'>6 Ano Ensino Fundamental</option>
                    <option value='7ef'>7 Ano Ensino Fundamental</option>
                    <option value='8ef'>8 Ano Ensino Fundamental</option>
                    <option value='9ef'>9 Ano Ensino Fundamental</option>
                </select>
                <button>Cadastrar</button>
            </form>
        </div>
        </div>
    )
}   