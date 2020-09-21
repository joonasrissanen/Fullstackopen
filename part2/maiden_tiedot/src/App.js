import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <form>
      <div>find countries <input value={filterValue} onChange={handleFilterChange} /></div>
    </form>
  );
}

const Weather = ({ location }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios.get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
    ).then(result => setWeather(result.data.current));
  }, []);
  return (
    <div>
      <h2>Weather in {location}</h2>
      {weather && (
        <div>
          <p>
            <strong>temperature</strong>:
            {`${weather.temperature} Celsius`}
          </p>
          <img
            src={weather.weather_icons[0]}
            alt="weather"
            width="100"
            height="100"
          />
          <p>
            <strong>wind</strong>:
            {`${weather.wind_speed} mph direction ${weather.wind_dir}`}
          </p>
        </div>
      )}
    </div>
  )
}

const CountryDetails = ({ country }) => {
  if (!country) {
    return null;
  }
  const { name, capital, population, languages, flag } = country;
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img
        src={flag}
        width="200"
        height="200"
        alt="flag"
      />
      <Weather location={capital} />
    </div>
  );
};

const Countries = ({ countries }) => {
  const [country, setCountry] = useState(null);

  const showCountry = (event, value) => {
    event.preventDefault();
    setCountry(value);
  }
  if (countries.length === 1 || country) {
    return <CountryDetails country={country || countries[0]} />
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.name}>{country.name} <button onClick={event => showCountry(event, country)}>show</button></li>
        )}
      </ul>
    )
  }
  return null;
}

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((result) => {
      setAllCountries(result.data);
      setFilteredCountries(result.data);
    });
  }, []);

  useEffect(() => {
    const countries = [];
    allCountries.forEach(country => {
      const name = country.name.toLowerCase();
      if (name.substring(0, filter.length) === filter.toLowerCase() || filter === '') {
        countries.push(country);
      }
    })
    setFilteredCountries(countries);
  }, [filter]);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  };

  return (
    <div>
      <Filter filterValue={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
