import React from 'react';
import {Link} from 'react-router-dom';
function Nav(props){
    return(
        <div>
            {(props.location != '/'  ) ? 'Nav': null }
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/new/post'><button>New Post</button></Link>
            <Link to='/'><button>Logout</button></Link>
        </div>
    )
}

export default Nav;