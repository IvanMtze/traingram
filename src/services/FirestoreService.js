import { db } from "../firebase";

export const streamPosts = (userUid, observer) => {
    return db.collection('users')
        .doc(userUid)
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .get().then(observer);
};