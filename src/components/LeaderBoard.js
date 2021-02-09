import React, { Component } from 'react'
import { connect } from 'react-redux';
import UserState from './UserState'

class Leaderboard extends Component {
  
  render() {
  const { users } = this.props;
  const userArray = Object.keys(users).map((key) => users[key]);
  const sortedUserArray = userArray.sort((a, b) => {
    return Object.keys(b.answers).length + b.questions.length - Object.keys(a.answers).length - a.questions.length
  })

    return (
      <div className='board'>
        <h3 className='center'>Leaderboard</h3>
        <ul className='board-list'>
          {sortedUserArray.map((user) => (
            <li key={user.id}>
              <UserState user={user} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard)
