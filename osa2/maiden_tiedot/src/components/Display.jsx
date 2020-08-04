import React from 'react'
import Details from './Details'

const Display = ({ countries, search, handleClick }) => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    const results = filtered.map(country => {
        return <div key={country.name}>{country.name} <button value={country.name} onClick={handleClick}>Show</button></div>
    })
    const result = filtered[0]

    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filtered.length === 1) {
        return <Details country={result} />
    }

    return <div>{results}</div>
}

export default Display