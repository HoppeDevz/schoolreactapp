import React from 'react';
import './styles.css';
import { useState } from  'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowUp } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';


export default function ChangeBill() {

    const params = useParams();
    const user_id = params.id
    const bill_id = params.billID

    /*
    Notas
    */
    const [notemath, setMathnote] = useState(0);
    const [notephysical, setPhysicalnote] = useState(0);
    const [notechemistry, setChemistrynote] = useState(0);
    const [notephilosophy, setPhilosophynote] = useState(0);
    const [notesociology, setSociologynote] = useState(0);
    const [noteessay, setEssaynote] = useState(0);
    const [notephysical_education, setPhysical_educationnote] = useState(0);
    const [noteportuguese, setPortuguesenote] = useState(0);
    const [noteliterature, setLiteraturenote] = useState(0);
    const [noteenglish, setEnglishnote] = useState(0);
    const [notebiology, setBiologynote] = useState(0);
    /*
    Notas
    */

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
    }
    
    function changeBillNote( discipline, value ) {
        api.post("changeBillNotes", { id: user_id, bill_id, discipline, value  })
        alert(`Nota alterada com sucesso para : ${value} pts`)
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
            <h1> Alterar notas do Bimestre {bill_id}</h1>

            <div className='changebillnotes'>
            <h2>Matematica</h2>
            <input value={notemath} type='number' onChange={e => setMathnote(e.target.value)}/>
            <button onClick={() => changeBillNote("math", notemath)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Física</h2>
            <input value={notephysical} type='number' onChange={e => setPhysicalnote(e.target.value)}/>
            <button onClick={() => changeBillNote("physical", notephysical)} >Alterar</button>
            </div>

            <div className='changebillnotes'>
            <h2>Química</h2>
            <input value={notechemistry} type='number' onChange={e => setChemistrynote(e.target.value)}/>
            <button onClick={() => changeBillNote("chemistry", notechemistry)} >Alterar</button>
            </div>

            <div className='changebillnotes'>
            <h2>Filosofia</h2>
            <input value={notephilosophy} type='number' onChange={e => setPhilosophynote(e.target.value)}/>
            <button onClick={() => changeBillNote("philosophy", notephilosophy)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Sociologia</h2>
            <input value={notesociology} type='number' onChange={e => setSociologynote(e.target.value)}/>
            <button onClick={() => changeBillNote("sociology", notesociology)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Redação</h2>
            <input value={noteessay} type='number' onChange={e => setEssaynote(e.target.value)}/>
            <button onClick={() => changeBillNote("essay", noteessay)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Educação Física</h2>
            <input value={notephysical_education} type='number' onChange={e => setPhysical_educationnote(e.target.value)}/>
            <button onClick={() => changeBillNote("physical_education", notephysical_education)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Português</h2>
            <input value={noteportuguese} type='number' onChange={e => setPortuguesenote(e.target.value)}/>
            <button onClick={() => changeBillNote("portuguese", noteportuguese)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Literatura</h2>
            <input value={noteliterature} type='number' onChange={e => setLiteraturenote(e.target.value)}/>
            <button onClick={() => changeBillNote("literature", noteliterature)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Inglês</h2>
            <input value={noteenglish} type='number' onChange={e => setEnglishnote(e.target.value)}/>
            <button onClick={() => changeBillNote("english", noteenglish)} >Alterar</button>
            </div>


            <div className='changebillnotes'>
            <h2>Biologia</h2>
            <input value={notebiology} type='number' onChange={e => setBiologynote(e.target.value)}/>
            <button onClick={() => changeBillNote("biology", notebiology)} >Alterar</button>
            </div>

        </div>

        </div>
    )
}   