import React, { useEffect, useState } from 'react'
import { getCountries, getCountry } from '../../api/weatherApi';
import Container from '@mui/material/Container'
import CountriesCard from './CountriesCard';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterCountries, setFilterCountries] = useState([]);

    useEffect(() => {
        loadCountries();
    }, []);

    useEffect(() => {
        let searchTimeout;
        const delay = 1000;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            handleSearchV2(searchTerm);
        }, delay);

        return () => {
            clearTimeout(searchTimeout);
        };
    }, [searchTerm]);
    console.log('render');
    const loadCountries = () => {
        setLoading(true);
        getCountries()
            .then((res) => {
                setCountries(res.data);
                setFilterCountries(res.data);
                setLoading(false);
            }).catch((err) => {
                setCountries(false);
                console.log(err);
            });
    }

    const handleRegion = (e) => {
        if (e.target.value === "All") {
            setFilterCountries(countries);
            setSearchTerm('');
            return;
        }
        setSearchTerm('');
        const filter = countries.filter((c) => c.region === e.target.value);
        setFilterCountries(filter);

    }

    const handleSearch = (e) => {
        const filter = countries.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterCountries(filter);
    }

    const handleSearchV2 = (searchTerm) => {
        if (searchTerm !== '') {
            getCountry(searchTerm)
                .then((res) => {
                    setFilterCountries(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }


    return (
        <Container maxWidth="xl">
            <div className='flex m-5 justify-between'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    className="input input-bordered input-info w-96"
                    onChange={handleSearchChange}
                />
                <select onChange={handleRegion} className="select select-bordered w-full max-w-xs">
                    <option disabled defaultValue>Filter by region</option>
                    <option value="All">All</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Americas">Americas</option>
                    <option value="Polar">Polar</option>
                </select>
            </div>
            <div className="flex flex-wrap justify-around gap-4">
                {loading ? <div>Loading...</div> :
                    filterCountries.map((c) => (
                        <CountriesCard key={c.numericCode} c={c} />
                    ))
                }
            </div>
        </Container>
    )
}

export default Countries;