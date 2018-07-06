import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserInfo, clearUserInfo } from '../../ducks/reducer';
import axios from 'axios';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.displayUsernameProfilePic = this.displayUsernameProfilePic.bind(this);
    }
    componentDidMount() {
        axios.get('/api/auth/me')
            .then(res => {
                if (res.data[0]) {
                    let { username, profile_pic } = res.data[0];
                    this.props.updateUserInfo(username, profile_pic);
                }

            })
            .catch(err => console.log(err))
    }

    displayUsernameProfilePic() {
        return (
            <div className="nav">
                <h1>Username: {this.props.username}</h1>
                <img src={this.props.profile_pic} height={100} width={100} alt="" />
            </div>
        )
    }

    logout = () => {
        axios.post('/api/auth/logout')
            .then(() =>{
                this.props.clearUserInfo()
                this.props.history.push('/')
            })
    }

    render() {
        return (
            <div>
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/new/post'><button>New Post</button></Link>
                <button onClick={this.logout}>Logout</button>
                {(this.props.location != '/') ? this.displayUsernameProfilePic() : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        profile_pic: state.profile_pic
    }
}

export default connect(mapStateToProps, { updateUserInfo, clearUserInfo })(Nav);