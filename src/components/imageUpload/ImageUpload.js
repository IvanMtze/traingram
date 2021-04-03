import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage, auth} from '../../firebase';
import firebase from "firebase"
import { AuthContext } from '../../App';

function ImageUpload({ username }) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const {state} = React.useContext(AuthContext);
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`users/${auth.currentUser.uid}/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref("users/"+auth.currentUser.uid).child(image.name).getDownloadURL().then(url => {
                    db.collection('users').doc(auth.currentUser.uid).collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: state.user.user.displayName,
                        imagename: image.name
                    });
                    db.collection('users').doc(auth.currentUser.uid).set({
                       lastUpdate:firebase.firestore.FieldValue.serverTimestamp() 
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                    console.log('ok')
                });
            }
        );
    };
    return (
        <div className="image__upload">
            <progress className="image__upload__progress" value={progress} max="100" />

            <input type="text" placeholder="Enter a caption" value={caption} onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />

            <Button onClick={handleUpload} disabled={!image}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
