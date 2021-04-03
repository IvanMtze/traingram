import React from 'react'
import { useState, useEffect } from 'react';
import ImageUpload from '../imageUpload/ImageUpload';
import Header from '../header/Header';
import { db } from '../../firebase';
import Post from '../post/Post';
import { } from './Home.css'
function Home() {
    const [posts, setPosts] = useState([]);
    const [user,] = useState(null);
    useEffect(() => {
        db.collection("users").onSnapshot(querySnapshot => {   
            console.log("hi");
            querySnapshot.docs.map(doc => {
                console.log("hi")
                db.collection('users/' + doc.id + '/posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(docu => ({
                        id: docu.id,
                        post: docu.data()
                    })
                    ))
                })
            })
        });

    }, []);

    return (
        <div className="app">
            <Header></Header>
            {
                posts.map(({ id, post }) => (<Post key={id} postId={id} actualUser={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />))
            }
            <ImageUpload />
        </div>
    )
}
export default Home;