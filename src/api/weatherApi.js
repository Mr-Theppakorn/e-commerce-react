import axios from 'axios';

const apiKey = 'e8ee0968bd510894c46f5c0ab90a6ee8';
const city = 'Thailand';

export const getWeather = async (search) => {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`);
}

export const getWeatherForecast = async (lat, lon, day) => {
    return await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
}

export const getCountries = async () => {
    return await axios.get("https://restcountries.com/v2/all");
}

export const getCountry = async (name) => {
    return await axios.get(`https://restcountries.com/v2/name/${name}`);
}

export const getPokemon = async () => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon?&limit=50`);
}
