import React from 'react'

export default function UserState(props) {
    const { user} = props;
    const avatar = user ? user.avatarURL : 'placeholder.jpg';
    const answeredQuestions = Object.entries(user.answers).length
    const createdQuestions = user.questions.length
    const score = answeredQuestions + createdQuestions
    return (
        <div className='userstate'>
            <div>
                <p>{user.name}</p>
                <img
                    src={avatar}
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                />
            </div>
            <div>
                <span>Answered questions: {answeredQuestions}</span>
                <span>Created questions:{createdQuestions}</span>
                <span>Score: {score}</span>
            </div>
        </div>
    )
}

