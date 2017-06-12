/**
 * @ignore  =====================================================================================
 * @file    socket.begin
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 3:46 PM 11/06/2017
 * @ignore  =====================================================================================
 */
import React, {Component} from "react";
import chat from './chat';
import './chat.css';
class Chat extends Component {
    constructor(options) {
        super(options);
        this.state = {
            online: false,
            isTyping: false
        }
    }
    componentDidMount(){
        chat();
    }
    render(){
        return <ul className="pages">
            <li className="chat page">
                <div className="chatArea">
                    <ul className="messages"></ul>
                </div>
                <input className="inputMessage" placeholder="Type here..."/>
            </li>
            <li className="login page">
                <div className="form">
                    <h3 className="title">What's your nickname?</h3>
                    <input className="usernameInput" type="text" maxLength="14" />
                </div>
            </li>
        </ul>
    }
}

export default Chat;