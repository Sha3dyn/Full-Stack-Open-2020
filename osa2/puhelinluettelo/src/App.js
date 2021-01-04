import React, { useState, useEffect } from 'react'
import Person from './Components/Person'
import personService from './Services/persons'
import Notification from './Components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('') 
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notification, setNewNotification] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
                name: newName,
                number: newNumber
        }

        if (persons.filter(p => p.name === newName).length === 0) {
            personService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewNotification(`Added ${newName}`)
                    setType('notification')
                    setTimeout(() => {
                        setNewNotification(null)
                        setType(null)
                    }, 5000)
                    
                })
                .catch(error => {
                    console.log(error.response.data)
                    setNewNotification(error.response.data.error)
                    setType('error')
                    setTimeout(() => {
                        setNewNotification(null)
                        setType(null)
                    }, 5000)
                })

                setNewName('')
                setNewNumber('')
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const found = persons.find(p => p.name === personObject.name)

                personService
                    .update(found.id, personObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== found.id ? person : response.data))

                        setNewNotification(`Updated phonenumber for ${newName}`)
                        setType('notification')
                        setTimeout(() => {
                            setNewNotification(null)
                            setType(null)
                        }, 5000)

                    }).catch(() => {
                        setNewNotification(`${found.name} is already deleted`, `error`)
                        setType('error')
                        setTimeout(() => {
                            setNewNotification(null)
                            setType(null)
                        }, 5000)

                    })
            }
        }

        setNewName('')
        setNewNumber('')
    }

    const deleteRecord = (person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(response => {
                    setPersons(persons.filter(p => p.id !== person.id))

                    setNewNotification(`Deleted ${newName}`)
                    setType('notification')
                    setTimeout(() => {
                        setNewNotification(null)
                        setType(null)
                    }, 5000)

                }).catch(() => {
                    setPersons(persons.filter(p => p.id !== person.id))

                    setNewNotification(`${person.name} is already deleted`, `error`)
                    setType('error')
                    setTimeout(() => {
                        setNewNotification(null)
                        setType(null)
                    }, 5000)
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} type={type} />
            <div>
                filter shown with <input value={newFilter} onChange={handleFilterChange} />
            </div>
            <h2>Add new phone record</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {filtered.map(person =>
                    <Person key={person.id} person={person} deleteRecord={deleteRecord} />
                )}
            </div>
        </div>
    )

}

export default App;
