import { Avatar, IconButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import { AuthContext } from '../../App';
import {  db } from '../../firebase';
import Header from '../header/Header';
import { } from './Profile.css';
import { makeStyles } from '@material-ui/core/styles';
import Post from '../post/Post';
const useStyles = makeStyles({
    root: {
        width: '200px',
        height: '200px'
    },
});
function Profile() {
    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const { state, dispatch } = React.useContext(AuthContext);

    console.log(state)
    useEffect(() => {
        db.collection("users").onSnapshot(querySnapshot => {
            querySnapshot.docs.map(doc => {
                db.collection('users/' + state.user.user.uid + '/posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(docu => ({
                        id: docu.id,
                        post: docu.data(),
                        postUserId: doc.id,
                    })
                    ))
                })
            })
        });

    }, [state.user.user.uid]);

    return (

        <div>
            <Header></Header>

            <div className="profile__container">
                <div className="profile__header">
                    <Avatar src={state.user.user.photoURL} classes={{ root: classes.root }} />
                    <h1>
                        {state.user.additionalUserInfo.profile.name}
                    </h1>
                    <IconButton aria-label="conf"
                        className="settings__op">
                        <SettingsIcon />
                    </IconButton>

                </div>
                <div className="profile__posts__container">
                    {posts.length ?
                        <div className="posts__list">
                            {
                                posts.map(({ id, post, postUserId }) => (<Post key={id} postId={id} actualUser={state.user.user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postUserProfileImg={post.profileImageUrl} postedUserId={postUserId} />))
                            }
                        </div> : <div>
                            <h3 className="profile__emtpy">Nada por aquí</h3>


                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
export default Profile;