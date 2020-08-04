import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Display from './components/Display'


const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    return (
        <>
            <div>
                <form>
                    find countries <input value={newSearch} onChange={handleSearchChange} />
                </form>
            </div>
            <div>
                <Display countries={countries} search={newSearch} handleClick={handleSearchChange} />
            </div>
        </>
    )
}

export default App;
