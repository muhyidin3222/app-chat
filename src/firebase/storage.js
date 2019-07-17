import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import image from './image.jpeg'

const config = {
    apiKey: "AIzaSyBm6XlvlK3rmTMl4g_oP-LihphrQAxX4Co",
    authDomain: "chat-c8703.firebaseapp.com",
    databaseURL: "https://chat-c8703.firebaseio.com",
    projectId: "chat-c8703",
    storageBucket: "chat-c8703.appspot.com",
    messagingSenderId: "589548980489",
    appId: "1:589548980489:web:4589c28635683005"
}

export default class Storage extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         selectedFile: null,
    //         url: '',
    //         progress: 0,
    //         itemLocation: []
    //     }

    //     console.log(this.props)
    // }
    componentDidUpdate() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        if (this.state.itemLocation !== []) {

        }
    }
    componentDidMount() {
        firebase.initializeApp(config)
        this.fectImage()
    }
    fectImage = () => {
        var storageRef = firebase.storage().ref()
        var listRef = storageRef.child('images');
        listRef.listAll().then((res) => {
            // console.log(res)
            this.setState({ itemLocation: res.items })
            res.prefixes.forEach((folderRef) => {
                // console.log(folderRef.Location)
            });
            res.items.forEach((itemRef) => {

            });
        }).catch((error) => {
            // console.log(error)
        });
    }
    getImage = () => {
        const image = this.state.selectedFile
        const storage = firebase.storage()
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    // console.log(url);
                    this.setState({ url });
                })
            }
        );
    }
    upload = () => {
        const image = this.state.selectedFile
        var storageRef = firebase.storage().ref(image.name);
        var task = storageRef.put(image)
        task.on('state_changed',
            (snapshot) => {
                // console.log(snapshot) 
            },
            (err) => {
                //  console.log(err) 
            },
            (complete) => {
                //  console.log(complete) 
            }
        )
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })

    }
    render() {
        // console.log(this.state.itemLocation, 'asd;kfjaslfjdls;ajfl')
        return (
            <div>
                <div>Upload</div>
                <progress value={this.state.progress} max="100" />
                <input type="file" onChange={this.fileChangedHandler} />
                <br />
                <Button onClick={() => this.getImage()}>get</Button>
                <Button onClick={() => this.upload()}>Upload</Button>
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
            </div>
        )
    }
}
