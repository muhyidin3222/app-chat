import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import config from './configFirebase'
import firebase from 'firebase'

export default class singIn extends Component {
    state = {
        email: '',
        password: ""
    }

    componentDidUpdate() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    createEmail = () => {
        const { email, password } = this.state
        if (email.trim() !== '') {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                })
        }
    }

    loginEmail = () => {
        const { email, password } = this.state
        if (email.trim() !== '') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(ress => console.log(ress))
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                })
        }
    }

    logOut = () => {
        const { email, password } = this.state
        if (email.trim() !== '') {
            firebase.auth().signOut()
                .then(ress => console.log(ress))
                .catch(function (error) {
                    console.log('erro')
                })
        }
    }

    loginWitdhGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
    }

    render() {
        const { email, emails, password } = this.state
        return (
            <div>
                <div>Email</div>
                <Input
                    onChange={event => this.setState({ email: event.target.value })}
                    value={email}
                />

                <div>Password</div>
                <Input
                    onChange={event => this.setState({ password: event.target.value })}
                    value={password}
                />
                <br />
                <Button onClick={() => this.createEmail()}>Create Email</Button>
                <br />
                <Button onClick={() => this.loginEmail()}>login Email</Button>
                <br />
                <Button onClick={() => this.logOut()}>log Out</Button>
                <br />
                <Button onClick={() => this.loginWitdhGoogle()}>Login Witdh Google</Button>
            </div>
        )
    }
}
