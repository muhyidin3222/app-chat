import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import firebase from "firebase"
import ConfigFirebase from './configFirebase'
import "../App.css"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { text: "", messages: [] }
    }
    componentDidMount() {
        // ConfigFirebase()
        firebase.initializeApp(ConfigFirebase)
        this.getMessages()
    }

    onSubmit = event => {
        if (event.charCode === 13 && this.state.text.trim() !== "") {
            console.log(event.charCode, this.state.text.trim())
            this.writeMessageToDB(this.state.text)
            this.setState({ text: "" })
        }
    }

    writeMessageToDB = message => {
        firebase
            .database()
            .ref("messages/")
            .push({
                text: message
            })
    }

    getMessages = () => {
        var messagesDB = firebase
            .database()
            .ref("messages/")
            .limitToLast(500)
        messagesDB.on("value", snapshot => {
            let newMessages = []
            snapshot.forEach(child => {
                var message = child.val()
                newMessages.push({ id: child.key, text: message.text })
            })
            this.setState({ messages: newMessages })
            this.bottomSpan.scrollIntoView({ behavior: "smooth" })
        })
    }

    renderMessages = () => {
        return this.state.messages.map(message => (
            <ListItem>
                <ListItemText
                    style={{ wordBreak: "break-word" }}
                    primary={message.text}
                />
            </ListItem>
        ))
    }

    render() {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                // ...
            } else {
                console.log('Unable to get permission to notify.');
            }
        });
        return (
            <div className="App">
                <List>{this.renderMessages()}</List>
                <TextField
                    autoFocus={true}
                    multiline={true}
                    rowsMax={3}
                    placeholder="Type something.."
                    onChange={event => this.setState({ text: event.target.value })}
                    value={this.state.text}
                    onKeyPress={this.onSubmit}
                    style={{ width: "98vw", overflow: "hidden" }}
                />
                <span ref={el => (this.bottomSpan = el)} />
            </div>
        )
    }
}

export default App
