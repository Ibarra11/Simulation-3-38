import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUserInfo} from '../../ducks/reducer';
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleOnChange = event => this.setState({ [event.target.name]: event.target.value });

    registerUser = () => {
        axios.post('/api/auth/register', {
            username: this.state.username,
            password: this.state.password
        })
            .then((user) => {
                let { username, profile_pic} = user.data;
                this.props.updateUserInfo( username, profile_pic)
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err))
    }

    checkLogin = () => {
        axios.post('/api/auth/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(user => {
                let {username, profile_pic} = user.data;
                this.props.updateUserInfo( username, profile_pic)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
            
    }
    render() {
        return (
            <div>
                <input onChange={this.handleOnChange} name='username' type="text" />
                <input onChange={this.handleOnChange} name='password' type="text" />
                <div className="auth-buttons">
                    <button onClick={this.checkLogin}>Login</button>
                    <button onClick={this.registerUser}>Register</button>
                </div>
            </div>
        )
    }
}


export default connect(null, {updateUserInfo})(Auth);
