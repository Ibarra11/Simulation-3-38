import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }

    componentDidMount(){
        let {postid} = this.props.match.params;
        axios.get(`/api/post/${postid}`)
        .then(res =>{
            console.log(res);
            let {title, img, content, username, profile_pic} = res.data[0];
            this.setState({
                title: title, img: img, content: content, author: username, authorPicture: profile_pic
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div className="component-post">
            <button onClick={() => this.props.history.push('/dashboard')}>Go Back</button>
                <div className="image-caption">
                    <h2>{this.state.title}</h2>
                    <img src={this.state.img} alt=""/>
                </div>
                <div className="author-description">
                    <p>{this.state.author}</p>
                    <img src={this.state.authorPicture} alt=""/>
                    <p>{this.state.content}</p>
                </div>
            </div>
        )
    }
}


export default Post;
