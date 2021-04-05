import React from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { db } from '../../../firebase';
import {} from './PostActionBar.css';

function PostActionBar({ postId, userId, actualUserId }) {

    const [state, setState] = React.useState({
        checkedA: false,
    });
    const [likesUser, setLikesUser] = React.useState({
        likes: []
    })
    const handleChange = (event) => {
        if (state.checkedA) {
            const index = likesUser.likes.indexOf(actualUserId);
            likesUser.likes.splice(index, 1);
        } else {
            likesUser.likes.push(actualUserId);
        }
        db.collection("users").doc(userId+'').collection("posts").doc(postId+'').update({
            'likes': likesUser.likes
        });
    };


    db.collection("users").doc(userId+'').collection("posts").doc(postId+'').get().then((doc) => {
        if (doc.exists){
        setLikesUser({ likes: doc.data().likes})
        if (doc.data().likes.indexOf(actualUserId) > -1) {
            setState({ checkedA: true })
        }
    }
    });
    return (
        <div className="options__bar">
            <div className="div__likes">
            <FormControlLabel className="formControl__likes"
                control={
                    <Checkbox className="checkbox__likes"
                        checked={state.checkedA}
                        onChange={handleChange}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    />
                }
                label=""
            />
            </div>
            <div>
                <text>{likesUser.likes.length}</text>
            </div>
            <div>
                <svg className="div__svg__comment" viewbox="0 0 48 48" preserveAspectRatio="none">
                <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd" transform="scale(0.4,0.4)"
 ></path>
                </svg>
            </div>

        </div>
    )
}
export default PostActionBar