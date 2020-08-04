import React from 'react'

const Person = ({ person, deleteRecord }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => deleteRecord(person)}> delete </button>
        </div>
    )
}

export default Person