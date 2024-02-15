import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container'
import { useEffect } from 'react';
import { getCountry } from '../../api/weatherApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'

const Country = () => {
    const { country } = useParams();
    const [countryData, setCountryData] = useState({});
    let navigate = useNavigate();
    useEffect(() => {
        getCountry(country).then((res) => {
            setCountryData(res.data[0])
            console.log(res.data[0]);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Container>
            <button className="btn btn-outline mt-5" onClick={() => navigate("/countries")}>
                <ArrowBackIcon />
                Back
            </button>
            <div className='m-10'>
                <img className='w-[600px] h-[300px] m-auto' src={countryData.flag} alt="Country" />
            </div>
            <Typography className='text-center' variant="h3" color="initial">{countryData.name}</Typography>

            <div className="flex flex-col w-full lg:flex-row">
                <div className="flex-grow h-auto card bg-base-300 rounded-box place-items-center m-5 p-5">
                    <h1>Native Name : <span>{countryData.nativeName}</span></h1>
                    <h1>Population : <span>{countryData.population}</span></h1>
                    <h1>Region : <span>{countryData.region}</span></h1>
                    <h1>Sub Region : <span>{countryData.subregion}</span></h1>
                    <h1>Capital : <span>{countryData.capital}</span></h1>

                </div>

            </div>
        </Container >
    )
}

export default Country