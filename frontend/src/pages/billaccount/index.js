import React from 'react';
import './styles.css';
import { useState, useEffect } from  'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowUp } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { useParams } from 'react-router-dom';


export default function BillAccount() {

    const [bill, setBill] = useState([]);

    const params = useParams();
    console.log(params)

    const user_id = params.id

    const history = useHistory();

    useEffect(() => {
        api.post("/getBillFromId", { id : user_id})
        .then(response => {
            console.log(response.data.data.data)
            setBill(response.data.data.data)
        })
    }, [])

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

    function ChangeBillHandler(id) {
        history.push(`/changeBill/${user_id}/${id}`)
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

        <div>
            <h2 className='titlebimestry'> Bimestres: <strong>{bill.length}</strong> </h2>
            {bill.map(bill => (
                <div className='billinfo'>

                    <h1 className='titlebill'>Bimestre:{bill.id}</h1>

                    <div className='billnote'>
                    <h2>Matemática: </h2>
                    <h3>{bill.math} pts</h3>
                    </div>

                    <div className='billnote'>
                    <h2>Física: </h2>
                    <h3>{bill.physical} pts</h3>
                    </div>

                    <div className='billnote'>
                    <h2>Química: </h2>
                    <h3>{bill.chemistry} pts</h3>
                    </div>

                    <div className='billnote'>
                    <h2>Filosofia: </h2>
                    <h3>{bill.philosophy} pts</h3>
                    </div>
                    
                    <div className='billnote'>
                    <h2>Sociologia: </h2>
                    <h3>{bill.sociology} pts</h3>
                    </div>

                    <div className='billnote'>
                    <h2>Redação: </h2>
                    <h3>{bill.essay} pts</h3>
                    </div>

                    <div className='billnote'>
                    <h2>Educação Física: </h2>
                    <h3>{bill.physical_education} pts</h3>
                    </div>


                    <div className='billnote'>
                    <h2>Português: </h2>
                    <h3>{bill.portuguese} pts</h3>
                    </div>


                    <div className='billnote'>
                    <h2>Literatura: </h2>
                    <h3>{bill.literature} pts</h3>
                    </div>


                    <div className='billnote'>
                    <h2>Inglês: </h2>
                    <h3>{bill.english} pts</h3>
                    </div>


                    <div className='billnote'>
                    <h2>Biologia: </h2>
                    <h3>{bill.biology} pts</h3>
                    </div>

                    <button onClick={() => ChangeBillHandler(bill.id)}>Alterar</button>
                    
                </div>    
            ))}
        </div>


        
        </div>
    )
}   