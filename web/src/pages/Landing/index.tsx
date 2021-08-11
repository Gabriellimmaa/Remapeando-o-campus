import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/UenpLogo.png';

import './style.css';

export function LandingPage() {
    const [selectedCampus, setSelectedCampus] = useState('');
    const [link, setLink] = useState('');

    function handleChangeCampus(text: string) {
        setSelectedCampus(text);
        if(text === '0') {
            setLink('Band1')
        } else if(text === '1') {
            setLink('Band2')
        }
    }

    return (
        <div className="container">
            <img src={logo} alt="UENP Logo" />
            <select defaultValue={selectedCampus} onChange={
                (e) => {
                    handleChangeCampus(e.target.value)
                }
            }>
                <option value="" disabled hidden>
                    Nenhum
                </option>
                <option value="0" >
                    Bandeirantes
                </option>
                <option value="1" >
                    Cornélio Procópio
                </option>
                <option value="2" >
                    Jacarezinho
                </option>
            </select>

            <Link to={`/Map/${link}`}>
                Selecionar
            </Link>
        </div>
    );
}