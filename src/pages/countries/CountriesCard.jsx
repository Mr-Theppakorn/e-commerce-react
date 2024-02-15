import React from 'react'
import { useNavigate } from 'react-router-dom';

const CountriesCard = ({ c }) => {

    let navigate = useNavigate();
    return (
        <div className="card w-80 h-96 bg-base-100 shadow-xl cursor-pointer" onClick={() => navigate(`/countries/${c.name}`)}>
            <figure><img src={c.flag} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{c.name}</h2>
                <p>Population : {c.population}</p>
                <p>Region : {c.region}</p>
                <p>Capital : {c.capital}</p>
            </div>
        </div>
    )
}

export default CountriesCard