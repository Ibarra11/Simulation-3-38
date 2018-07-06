import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Form extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    onChangeInput = event => this.setState({[event.target.name]: event.target.value})

    submitPost = () =>{
        axios.post(`/api/post/${this.props.userid}`, {
            postTitle: this.state.title,
            img: this.state.img,
            content: this.state.content
        })
        .then(res => this.props.history.push('/dashboard'))
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div className="component-form">
                <div className="form-input">
                    <p>Title</p>
                    <input value={this.state.title} name='title' onChange={this.onChangeInput} type="text"/>
                </div>
                <div className="form-input">
                    <p>Image Url</p>
                    <input value={this.state.img} name='img' onChange={this.onChangeInput} type="text"/>
                </div>
                <div className="form-input">
                    <p>Content</p>
                    <input value={this.state.content} name='content' onChange={this.onChangeInput} type="text"/>
                </div>
                <button onClick={this.submitPost}>Post</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        userid: state.id
    }
}


export default connect(mapStateToProps)(Form);
