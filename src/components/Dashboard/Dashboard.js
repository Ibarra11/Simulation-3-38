import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        axios.get(`/api/posts/${this.props.id}?search=${this.state.search}&userposts=${this.state.userposts}`)
            .then(res => this.setState({ posts: res.data }))
            .catch(err => console.log(err))
    }

    resetSearch = () => {
        axios.get(`/api/posts/${this.props.id}?userposts=${this.state.userposts}`)
            .then(res => this.setState({ posts: res.data }))
            .catch(err => console.log(err))
    }

    handleSearchChange = event => this.setState({ search: event.target.value });

    handleUserpostChange = event => this.setState({ userposts: (!this.state.userposts ? true : false) })

    render() {
        return (
            <div className="dashboard-component">

                <div className="dashboard-search">
                    <input name='search' value={this.state.search} onChange={this.handleSearchChange} type="text" />
                    <button onClick={this.getPosts}>Search</button>
                    <button onClick={this.resetSearch}>Reset</button>
                    User posts <input onClick={this.handleUserpostChange} name='userposts' type="checkbox" defaultChecked value={this.state.userposts} />
                </div>

                <div className="dashboard-posts">
                    {this.state.posts.map(post => {
                        let { id, username, password, profile_pic, title } = post;
                        return (
                            <div key={id} className="dashboard-post">
                                <Link to={`/post/${id}`}>
                                    <h3>{title}</h3>
                                    <div className="dashbaord-userinfo">
                                        <h5>{username}</h5>
                                        <img src={profile_pic} width={100} height={100} alt="" />
                                    </div>
                                </Link>
                            </div>


                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        id: state.id
    }
}


export default connect(mapStateToProps)(Dashboard);
