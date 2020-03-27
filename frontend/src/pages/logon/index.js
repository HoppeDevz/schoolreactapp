import React from 'react';
import { useState } from  'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import ImgLogo from '../../assets/logo.png';
import api from '../../services/api';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

export default function Logon() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function SubmitHandler(e) {
        e.preventDefault();

        const data = {
            username, password
        }

        if (!username == '' && !password == '') {

            api.post("/checkAdminAccount", data)
            .then(response =>  {
                if (response.data.exist_account) {
                    //console.log(response)
                    localStorage.setItem("account_id", response.data.data)
                    history.push('/dashboard')
                } else {
                    alert('Login/Senha incorretos!')
                }
            }).catch(err => {
                console.log(err)
            })
            

        } else {
            alert('Campos Vazios!')
        }
    }

    return(
    <div className='logon-container'>
        <img src={ImgLogo} className='logoimg' />
        <h1>Faça seu logon</h1>
        <form className='logon-inputs' onSubmit={SubmitHandler} >
            <input type="text" placeholder="Usuário" className='input-logon' value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Senha" className='input-logon' value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" className='button-login' >Login <FiLogIn size={16} color="#FFF" /> </button>
        </form>
    </div>
    )
}