import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import {Clear, AttachFile, Block, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import './chat.css';
import axios from './axios.js'
import { Link, useParams } from 'react-router-dom'
import Pusher from 'pusher-js';
import Recorder from './Recorder.js'
import SeedColor from "seed-color"
import Message from "./Message.js"

function PersonalChat(props) {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState("")
    const [member1, setMember1] = useState({})
    const [member2, setMember2] = useState({})
    const [replyMessage, setReplyMessage] = useState(null)

    let roomId = useParams();

    const sendMessage = async (e) => {
        e.preventDefault();
        if(input){
            setInput("");
        if(replyMessage) {
            await axios.post("/" + props.user.user._id + "/" + roomId.roomId + "/newMessage", {
                message: input,
                sender: props.user.user.displayName,
                timeStamp: new Date().getTime(),
                reply: true,
                parentMessageBody: replyMessage.message,
                parentMessageSender: replyMessage.sender
            }).then((response) => {
                setReplyMessage(null)
            })
        }
        else await axios.post("/" + props.user.user._id + "/" + roomId.roomId + "/newMessage", {
            message: input,
            sender: props.user.user.displayName,
            timeStamp: new Date().getTime(),
        })
    }
        
    }

    useEffect(async () => {
        console.log(roomId.roomId)
        await axios.get("/rooms/" + roomId.roomId)
            .then(response => {
                // console.log("axios");
                setMessages(response.data.messages.reverse())
                setRoomName(response.data.member1.displayName === props.user.user.displayName ?
                    response.data.member2.displayName : response.data.member1.displayName)
                setMember1(response.data.member1)
                setMember2(response.data.member2)
                setInput("")
            })
    }, [roomId])

    useEffect(() => {
        var pusher = new Pusher('907ee6bbccecf27950c2', {
            cluster: 'ap2'
        });

        var channel = pusher.subscribe('chatMessage');
        channel.bind('updated', async function (newMessage) {
            await axios.get("/rooms/" + roomId.roomId)
                .then(response => {
                    setMessages(response.data.messages.reverse())
                })
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }

    }, [roomId])

    async function leaveRoom() {
        await axios.post("/" + roomId.roomId + "/leaveRoom", {
            email: props.user.user.email,
            displayName: props.user.user.displayName
        })
    }

    function replyToMessage() {
        if(replyMessage) return (
            <div className="reply">
                
                <p style={
                    {   borderRadius:"5px", 
                        padding:"10px", 
                        border: "1px solid " + SeedColor(replyMessage.sender).toHex(), 
                        // backgroundColor: 'white', 
                        opacitiy: "0.5", 
                        marginLeft: "5px",  
                        marginTop: "5px",
                        paddingLeft: "2px",
                        flex: "1",
                        fontSize:"12px" ,
                        borderRight: "3px solid gray"

                        }}>

                    <span className="chat-name" style={{ color: SeedColor(replyMessage.sender).toHex() }}> 
                        {replyMessage.sender} 
                    </span>           
                    {replyMessage.message.substring(0,120)}
                </p>

                <IconButton onClick={ () => {setReplyMessage(null)} }>
                    <Clear/>
                </IconButton>

            </div>
        )
    }



    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={member1.displayName === props.user.user.displayName ?
                    member2.photoURL : member1.photoURL} />
                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <p>online</p>
                </div>
                <div className="chat-header-right">       
                    <Link to="/">
                        <IconButton>
                            <Block onClick={leaveRoom} className="custom-button"/>
                        </IconButton>
                    </Link>
                    <IconButton>
                        <SearchOutlined className="custom-button"/>
                    </IconButton>

                </div>
            </div>
            <div className="chat-body">


                {messages.map(message => <Message message={message} user={props.user} 
                            setReplyMessage={setReplyMessage} 
                            personal member1={member1} member2={member2}/>)}
            </div>
            <div className="chat-footer-reply">
                {replyToMessage()}
                <div className="chat-footer">
                    <form style={{margin: "5px"}}>
                        <input placeholder="Type a message" type="text" value={input} onChange={e => setInput(e.target.value)} autoFocus = {true} />
                        <button type="submit" onClick={sendMessage}>Send message</button>
                    </form>
                    <IconButton>
                        <InsertEmoticonIcon className="custom-button"/>
                    </IconButton>
                    <IconButton>
                        <AttachFile className="rotate-icon custom-button"/>
                    </IconButton>
                    <Recorder user={props.user} roomId={roomId.roomId} />

                </div>
            </div>
        </div>
    )
}

export default PersonalChat