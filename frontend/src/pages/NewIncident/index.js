import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()

        const ong_id = localStorage.getItem('ongId')

        const data = ({
            description,
            title,
            value,
        })

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ong_id
                }
            })

            alert('Caso criado com sucesso')

            history.push('/profile')
        } catch (err) {
            alert('Erro ao casdatrar caso, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhamente para encontrar um herói para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}