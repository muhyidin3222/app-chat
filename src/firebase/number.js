import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import config from './configFirebase'
import firebase from 'firebase'

export default class number extends Component {
    state = {
        phoneNumber: null,
        verificationCode: null,
        confirmResult: null
    }
    componentDidUpdate() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }
    onLoginOrRegister = () => {
        const { phoneNumber } = this.state;
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then((confirmResult) => {
                this.setState({ confirmResult });
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(code, message)
            });
    }
    onVerificationCode = () => {
        const { confirmResult, verificationCode } = this.state;
        confirmResult.confirm(verificationCode)
            .then((user) => {
            })
            .catch((error) => {
                const { code, message } = error;
            });
    }
    render() {
        const { phoneNumber, verificationCode, confirmResult } = this.state
        return (
            <div>
                <div>number</div>
                <Input
                    onChange={event => this.setState({ phoneNumber: event.target.value })}
                    value={phoneNumber}
                />
                <br />
                <Button onClick={() => this.onLoginOrRegister()}>Login Witdh Google</Button>
            </div>
        )
    }
}
