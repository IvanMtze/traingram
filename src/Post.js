import React, { Component } from 'react';
import './Post.css';
export class Post
extends Component {
    render() {
        return (
            <div>
                {/* header -> avatar + username*/}
                <h3>Username</h3>
                {/* post image */}
                <img className="post__image"
                    src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
                    alt=""
                />
                {/* username + caption*/}
                <h3>Username: caption</h3>
            </div>
        )
    }
}

export default Post
