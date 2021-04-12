import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db, firebase } from "../../firebase";
import PostActionBar from "./postBar/PostActionBar";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function Post({
    username,
    caption,
    imageUrl,
    postId,
    actualUser,
    postedUserId,
    postUserProfileImg
}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [menuShow, setMenuShow] = useState(null);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("/users/" + postedUserId + "/posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: actualUser.displayName,
                userUid: actualUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setComment("");
    };

    const deletePost = () => {
        db.collection("/users/" + postedUserId + "/posts")
        db.collection("/users/" + postedUserId + "/posts")
        .doc(postId).delete().then(()=>{console.log("Post eliminado")})
    }
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("/users/" + postedUserId.toString() + "/posts")
                .doc(postId.toString())
                .collection("comments")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId,postedUserId]);
    return (
        <div className="post">
            {/* header -> avatar + username*/}
            <div className="post__header">
                <Avatar className="post__avatar" alt="" src={postUserProfileImg} />
                <h3>{username}</h3>
                {
                    actualUser.uid===postedUserId? <div>
                    <IconButton onClick={(event) => { setMenuShow(event.currentTarget) }}>
                    <ExpandMoreIcon />
                </IconButton>
                <Menu
                    anchorEl={menuShow}
                    open={Boolean(menuShow)}
                    onClose={()=>{setMenuShow(null)}}
                >
                    <MenuItem onClick={()=>{deletePost()}}>Delete</MenuItem>

                </Menu></div>:<div></div>
                }
                
            </div>
            {/* post image */}
            <img className="post__image" src={imageUrl} alt="" />
            <PostActionBar actualUserId={actualUser.uid} postId={postId} userId={postedUserId} />

            {/* username + caption*/}
            <h4 className="post__text">
                <strong>{username}: </strong>
                {caption}
            </h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}: </strong>
                        {comment.text}
                    </p>
                ))}
            </div>

            <form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a coment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <button
                    id="post_button"
                    class="post__button disabled"
                    disabled={!comment.trim()}
                    type="submit"
                    onClick={postComment}
                >
                    Publicar
        </button>
            </form>
        </div>
    );
}

export default Post;
