import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    selectedUserId: null,
    toHome: false,
  }

  onChangeUser = (e) => {
    const selectedUserId = e.target.value

    this.setState({
      selectedUserId
    });
}

  handleSubmit = (e) => {
    const { selectedUserId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(selectedUserId));

    this.setState({
      toHome: true,
    });
  }

  componentDidMount() {
    this.props.dispatch(clearAuthedUser())
  }

  render() {
    const { selectedUserId, toHome } = this.state;
    const selected = selectedUserId ? selectedUserId : -1;
    const { history, users } = this.props;
    const avatar = selectedUserId ? users[selectedUserId].avatarURL : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';


    if (toHome === true) {
        const prevLocation = history.location.state;
        if (prevLocation != null) {
            return <Redirect to={prevLocation} push={true} />
        }
        return <Redirect to='/' />
      }
    return (
      <div>
        <h3 className='center'>Welcome to the Would You Rather App!</h3>
        <div className='login-box'>
            <span>Please select a user</span>
            <span>Sign in</span>
          <div className='user-select'>
           <img
              src={avatar}
              alt={`Avatar of ${selectedUserId}`}
              className='avatar'
            />
            <select value={selected} onChange={(e) => this.onChangeUser(e)}>
              <option value={-1} disabled>Select user...</option>
              {Object.keys(users).map((key) => {
                    return (
                        <option value={users[key].id} key={key}>{users[key].id}</option>
                      );
                })}
            </select>
          </div>
          <button
            className='btn'
            disabled={selectedUserId === null}
            onClick={(e) => this.handleSubmit(e)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }) {
  console.log(`the questions are ${questions}`)
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))