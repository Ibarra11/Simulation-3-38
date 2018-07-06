import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component {
    constructor(props){
       super(props);
       this.displayUsernameProfilePic = this.displayUsernameProfilePic.bind(this); 
    }


    displayUsernameProfilePic(){
        return(
            <div>
                <h1>Username: {this.props.username}</h1>
                <img src={this.props.profile_pic} alt=""/>
            </div>
        )
    }
    render() {
        return (
            <div>
                {(this.props.location != '/') ? this.displayUsernameProfilePic() : null}
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/new/post'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        username: state.username,
        profile_pic: state.profile_pic
    }
}

export default connect(mapStateToProps)(Nav);