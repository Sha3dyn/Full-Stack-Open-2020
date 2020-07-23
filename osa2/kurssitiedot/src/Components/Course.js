import React from 'react'

const Header = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    const { part } = props

    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    const { course } = props

    return (
        <div>
            {course.map(parts =>
                <Part key={parts.id} part={parts} />
            )}
        </div>
    )
}

const Total = (props) => {
    const { course } = props

    let totalExercises = course.reduce(function (sum, ex) {
        return sum + ex.exercises
    }, 0)

    return (
        <div>
            <h3>
                Total of {totalExercises} exercises
            </h3>
        </div>
    )
}

const Course = (props) => {
    const { course } = props

    return (
        <div>
            <Header course={course} />
            <Content course={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course