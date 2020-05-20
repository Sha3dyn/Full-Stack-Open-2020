import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

    const setRandom = () => setSelected(Math.floor(Math.random() * 6))

    const CountTotalVotes = () => {
        const copyVotes = [...votes]
        copyVotes[selected] += 1
        setVotes(copyVotes)
    }

    const mostPopular = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <ShowVotes votes={votes[selected]} />
            <HandleButton countVotes={CountTotalVotes} setRandom={setRandom} />
            <ShowPopular votes={mostPopular} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const HandleButton = (props) => {
    return (
        <div>
            <Button handleClick={props.countVotes} text='vote' />
            <Button handleClick={props.setRandom} text='next anecdote' />
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const ShowVotes = (props) => {
    return (
        <div>
            has {props.votes} votes
        </div>
    )
}

const ShowPopular = (props) => {
    return (
        <div>
            <h1>Most popular anecdote:</h1>
            <p>{anecdotes[props.votes]}</p>
        </div>
    )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))