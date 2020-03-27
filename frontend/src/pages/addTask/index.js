import React from 'react';
import './styles.css';
import { useState, useEffect } from  'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowUp, FiTrash } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';


export default function Register() {

    const [incidents, setIncidents] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [value, setValue] = useState('');
    const [grid, setGrid] = useState('');

    const history = useHistory();

    const account_id = localStorage.getItem("account_id")
    //console.log("localstorage" + " " + account_id)

    function NavRegister(e) {
        e.preventDefault();
        history.push('/dashboard')
    }
    //test

    function NavList(e) {
        e.preventDefault();
        history.push('/listRegisters')
    }

    function NavAddTask(e) {
        e.preventDefault();
        history.push("/addtask");
    }

    function DeleteHandler(id) {
        api.post("/deleteTask", { id })
        .then(response => {
            alert('Tarefa removida com sucesso!')
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    function AddTaskHandler() {
        const data = {
            title, description, value: value + 'pts', grid, account_posted: account_id
        }

        if ( title != '' && description != '' && value != '' && grid != '' ) {
            api.post("createTask", data)
            .then(response => {
                alert(`Tarefa criada com sucesso! Atualize a página`)
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert('Campos Vazios!')
        }
        
    }

    function LogoutHandler(e) {
        e.preventDefault();
        localStorage.clear();
        history.push("/")
    }

    useEffect(() => {
        api.post('/getTasksById', { id: account_id }).then(response => {
            setIncidents(response.data.data);
            console.log(response.data.data)
        })
    }, [account_id]);
    

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
        
        <div className="addTask-container">
            <div className="addTaskInfo">
                <h1>Adicionar Tarefa</h1>
                <p>Adicione novas tarefas para que os alunos possam ver!</p>

                <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}></input>
                <input placeholder="Descrição" value={description} onChange={e => setDesc(e.target.value)} ></input>
                <input placeholder="Valor em pontos (0~25)" type='number' value={value} onChange={e => setValue(e.target.value)}></input>
                <select value={grid} onChange={e => setGrid(e.target.value)} >
                <option value='1em'>1 Ano Ensino Médio</option>
                    <option value='2em'>2 Ano Ensino Médio</option>
                    <option value='3em'>3 Ano Ensino Médio</option>
                    <option value='6ef'>6 Ano Ensino Fundamental</option>
                    <option value='7ef'>7 Ano Ensino Fundamental</option>
                    <option value='8ef'>8 Ano Ensino Fundamental</option>
                    <option value='9ef'>9 Ano Ensino Fundamental</option>
                </select>
                <button onClick={AddTaskHandler}> <FiArrowUp size={16} color='#FFF' /> Adicionar</button>
            </div>
        </div>

        <div className='tasksDiv'>   
            {incidents.map(incidents => (
                <form className="item">
                    <p className='title'>Titulo:</p>
                    <p className='desc'>{incidents.title}</p>

                    <p className='title'>Descrição:</p>
                    <p className='desc'>{incidents.description}</p>

                    <p className='title'>Valor:</p>
                    <p className='desc'>{incidents.value}</p>

                    <p className='title'>Série:</p>
                    <p className='desc'>{incidents.grid}</p>

                    <button type='submit' onClick={() => DeleteHandler(incidents.id)} > <FiTrash2 size={16} color="#FFF" /> Deletar</button>
    
                </form>
            ))}

        </div>

        
        </div>
    )
}   