import React from 'react'
import Weather from './Weather'

const Details = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language => { return <li key={language.name}>{language.name}</li> })}
            </ul>
            <img src={country.flag} alt='flag' width='200px' />
            <h3>Weather in {country.capital}</h3>
            <Weather country={country.capital} />
        </div>
    )
}

export default Details