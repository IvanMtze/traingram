import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../header/Header';
import { db } from '../../firebase';
import Post from '../post/Post';
import { } from './Home.css'
import { AuthContext } from '../../App';

function Home() {

    const [posts, setPosts] = useState([]);
    const { state } = React.useContext(AuthContext);


    console.log(posts)

    useEffect(() => {
        const fetch = () => {
            db.collection("users").get().then(query => {
                console.log("tengo un nuevo usuario")
                query.docs.forEach(doc => {
                    console.log("value:")
                    console.log(doc.data())
                    db.collection('users')
                        .doc(doc.id)
                        .collection('posts')
                        .orderBy('timestamp', 'desc')
                        .get().then(querySnapshot => {
                            console.log("hey, buscando para"+doc.id)
                            var postsF = querySnapshot.docs.map(docSnapshot => ({
                                    id: docSnapshot.id,
                                    post: docSnapshot.data(),
                                    postUserId: doc.id,
                                }));
                            posts.push(...postsF)
                            setPosts(posts);
                        },
                        )
                })
            })
        }
        fetch();
    },[posts,setPosts]);

    return (
        <div className="app">
            <Header></Header>
            <div className="posts__list">
                {
                    posts?.map(({ id, post, postUserId }) => (<Post key={id} postId={id} actualUser={state.user.user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postUserProfileImg={post.profileImageUrl} postedUserId={postUserId} />))
                }
            </div>


        </div>

    )
}
export default Home;