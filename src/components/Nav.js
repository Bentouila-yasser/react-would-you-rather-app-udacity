import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Nav(props) {
    const { authedUser, users, loggedIn} = props
    const avatar = authedUser ? users[authedUser].avatarURL : 'placeholder.jpg';

    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' exact  activeClassName='active'>
                        Create Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact  activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
                {
                loggedIn
                ? <li>
                    <div className='nav-user'>
                        {authedUser}
                        <img  
                            src={avatar}
                            alt={`Avatar of ${authedUser}`}
                            className='nav-avatar'
                        />
                    </div>
                    <NavLink to='/login' exact activeClassName='active'>
                        logout
                    </NavLink>
                </li>
                :<li>
                    <NavLink to='/login' exact activeClassName='active'>
                        Login
                    </NavLink>
                </li> 
                }
            </ul>
        </nav>
    );
   }

function mapStateToProps ({ authedUser, users }) {
    return {
      authedUser,
      users,
      loggedIn: authedUser !== null
    }
}
  
export default connect(mapStateToProps, null, null, { pure: false })(Nav)