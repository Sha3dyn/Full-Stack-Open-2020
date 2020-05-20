import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}> {props.text} </button>
    )
}

const GiveFeedback = (props) => {
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={props.goodCounter} text='good' />
            <Button handleClick={props.neutralCounter} text='neutral' />
            <Button handleClick={props.badCounter} text='bad' />
        </div>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.counterType}</td>
            <td>{props.percentage}</td>
        </tr>
        
    )
}

const Statistics = (props) => {
    if (props.sum > 0) {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <StatisticLine text='good' counterType={props.good} />
                        <StatisticLine text='neutral' counterType={props.neutral} />
                        <StatisticLine text='bad' counterType={props.bad} />
                        <StatisticLine text='all' counterType={props.sum} />
                        <StatisticLine text='average' counterType={props.avg} />
                        <StatisticLine text='positive' counterType={props.pos} percentage="%" />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
            
        )
    }
    
    
}

const CountStatistics = (props) => {
    let total = props.goodValue + props.neutralValue + props.badValue
    let average = 0;
    let positive = 0;

    if (total > 0) {
        average = (props.goodValue - props.badValue) / total
        positive = (props.goodValue / total) * 100
    }

    return (
        <Statistics good={props.goodValue} neutral={props.neutralValue} bad={props.badValue} sum={total} avg={average} pos={positive} />
        
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodCounter = () => setGood(good + 1)
    const neutralCounter = () => setNeutral(neutral + 1)
    const badCounter = () => setBad(bad + 1)

    return (
        <div>
            <GiveFeedback goodCounter={goodCounter} neutralCounter={neutralCounter} badCounter={badCounter} />
            <CountStatistics goodValue={good} neutralValue={neutral} badValue={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))