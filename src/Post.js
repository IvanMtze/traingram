import React, { Component } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

export class Post
    extends Component {
    render() {
        return (
            <div className="post">
                {/* header -> avatar + username*/}
                <div className="post__header">
                    <Avatar className="post__avatar"
                        alt="RafehQazi"
                        src="https://i.ytimg.com/vi/ZX8p4_6jkoc/hqdefault.jpg"
                    />
                    <h3>username</h3>
                </div>
                {/* post image */}
                <img className="post__image"
                    src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
                    alt=""
                />
                {/* username + caption*/}
                <h4 className="post__text">
                    <strong>Ivan: </strong> This works</h4>
            </div>
        )
    }
}

export default Post
