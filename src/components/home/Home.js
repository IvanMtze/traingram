import React from 'react'
import { useState , useEffect} from 'react';
import ImageUpload from '../imageUpload/ImageUpload';
import Header from '../header/Header';
import { db } from '../../firebase';
import Post from '../post/Post';
import {} from './Home.css'
function Home() {
    const [posts, setPosts] = useState([]);

    const [user, ] = useState(null);




    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    return (
        <div className="app">
            <Header></Header>
            {
                posts.map(({ id, post }) => (<Post key={id} postId={id} actualUser={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />))
            }
            {user?.displayName ? (<ImageUpload username={user.displayName} />) : (<h3>Login to upload</h3>)}
        </div>
    )
}
export default Home;