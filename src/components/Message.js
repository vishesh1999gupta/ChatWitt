import { Avatar, IconButton } from '@material-ui/core'
import { Reply } from '@material-ui/icons'
import React, {useState} from 'react'
import SeedColor from "seed-color"
import "./chat.css"
import "./axios.js"

function Message({ message, user, setReplyMessage, personal, member1, member2}) {

    const [displayIcon, setDisplayIcon] = useState(false)

    function reply() {
        setReplyMessage(message)
    }

    let object
    if(message.type && message.type === "audio") {
        // FOR AUDIO MESSAGE
        object = (
            <div className={"chat-poora" + (user.user.displayName === message.sender ? " chat-poora-right" : "")}
                onMouseEnter={()=>{setDisplayIcon(true)}} onMouseLeave={()=>{setDisplayIcon(false)}}>

                {   user.user.displayName === message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }

                <p className={"chat-message" + (user.user.displayName === message.sender ? " chat-receiver" : "")}>

                    
                    {!personal && <span className="chat-name" style={{ color: SeedColor(message.sender).toHex() }}> {message.sender} </span>}
                    <div className="audio">
                        {personal && user.user.displayName === message.sender && <Avatar src={member1.displayName === message.sender ?
                                    member1.photoURL : member2.photoURL} />}
                        <audio
                            controls
                            src={message.media}>
                            Your browser does not support the
                                    <code>audio</code> element.
                        </audio>
                        {personal && user.user.displayName !== message.sender && <Avatar src={member1.displayName === message.sender ?
                                    member1.photoURL : member2.photoURL} />}
                        <br />
                        <span className="chat-time">{new Date(message.timeStamp).toLocaleTimeString()}</span>
                    </div>
                </p>
                
                {   user.user.displayName !== message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }
            </div>
        )
    }
    else if(!personal && message.type && message.type === "notif") {
        // NOTIF TYPE MESSAGE
        object = (
            <div className="notif">
                <p>{message.sender} {message.message}</p>
            </div>
        )
    }

    else if(message.reply) {

        object = (
            // REPLY TAG MESSAGE
            <div className={"chat-poora" + (user.user.displayName === message.sender ? " chat-poora-right" : "")}
                onMouseEnter={()=>{setDisplayIcon(true)}} onMouseLeave={()=>{setDisplayIcon(false)}}>
                
                {   user.user.displayName === message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }

                <div>
                    <p className={"chat-message" + (message.sender === user.user.displayName ? " chat-receiver" : "")}>
                        {!personal && <span className="chat-name" style={{ color: SeedColor(message.sender).toHex() }}> {message.sender} </span>}
                        <p style={
                            {
                                // borderRadius:"5%", 
                                padding:"10px", 
                                border: "1px solid " + SeedColor(message.parentMessageSender).toHex(), 
                                backgroundColor: message.sender === user.user.displayName ? "#72bffdfa" : "#ebebeb", 
                                opacitiy: "0.5", 
                                paddingLeft: "3px",
                                borderRadius: "5px",
                                fontSize:"12px" }}>
                            <span className="chat-name" style={{ color: SeedColor(message.parentMessageSender).toHex() }}> {message.parentMessageSender} </span>
                            {message.parentMessageBody}
                        </p>
                        {message.message} 
                        <br />
                        <span className="chat-time">{new Date(message.timeStamp).toLocaleTimeString()}</span>
                    </p>

                </div>
                {   user.user.displayName !== message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }
            </div>
        )
    }

    else {
        object = (
            // NORMAL MESSAGE
            <div className={"chat-poora" + (user.user.displayName === message.sender ? " chat-poora-right" : "")}
                onMouseEnter={()=>{setDisplayIcon(true)}} onMouseLeave={()=>{setDisplayIcon(false)}}>
                
                {   user.user.displayName === message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }
                <p className={"chat-message" + (message.sender === user.user.displayName ? " chat-receiver" : "")} >
                    <div>
                        {!personal && <span className="chat-name" style={{ color: SeedColor(message.sender).toHex() }}> {message.sender} </span>}
                        {message.message}
                        <br />
                        <span className="chat-time">{new Date(message.timeStamp).toLocaleTimeString()}</span>
                    </div>
                </p>
                {   user.user.displayName !== message.sender && displayIcon && 
                        <IconButton onClick={reply}>
                            <Reply style={{ fill: 'white' }} />
                        </IconButton>
                }
            </div>
        )
    }

    return object;
}

export default Message