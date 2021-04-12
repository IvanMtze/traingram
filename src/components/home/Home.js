import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../header/Header';
import { db } from '../../firebase';
import Post from '../post/Post';
import { } from './Home.css'
import { AuthContext } from '../../App';
import { useHistory } from 'react-router';


function Home() {

    const [posts, setPosts] = useState([]);
    const { state } = React.useContext(AuthContext);
    const history = useHistory();



    useEffect(() => {
        const fetch = () => {
            db.collection("users").get().then(query => {
                query.docs.forEach(doc => {
                    db.collection('users')
                        .doc(doc.id)
                        .collection('posts')
                        .orderBy('timestamp', 'desc')
                        .get().then(querySnapshot => {
                            var postsF = querySnapshot.docs.map(docSnapshot => ({
                                    id: docSnapshot.id,
                                    post: docSnapshot.data(),
                                    postUserId: doc.id,
                                    postUserProfileImg:doc.data().profileImageUrl+'?width=100&height=100'
                                }));
                            posts.push(...postsF)
                            setPosts(posts);
                            history.push('/')
                        },
                        )
                })
            })
        }
        fetch();
    },[posts,setPosts,history]);

    return (
        <div className="app">
            <Header></Header>
            <div className="posts__list">
                {
                    posts?.map(({ id, post, postUserId,postUserProfileImg }) => (<Post key={id} postId={id} actualUser={state.user.user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postUserProfileImg={postUserProfileImg} postedUserId={postUserId} />))
                }
            </div>


        </div>

    )
}
export default Home;