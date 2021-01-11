import { Avatar, IconButton } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import SidebarChat from './SidebarChat.js';
import SidebarPersonalChat from './SidebarPersonalChat.js';
import Pusher from 'pusher-js';
import axios from './axios.js';
import './sidebar.css';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

function Sidebar(props){

    const [rooms,setRooms] = useState([])

    function axiosGet() {
        axios.get("/" + props.user.user._id + "/rooms")
            .then(response => {
                // console.log("sidebar",response.data)
                setRooms(response.data)
            }
        )
    }

    useEffect(() => {
        axiosGet()
    },[])

    useEffect(() => {
        var pusher = new Pusher('907ee6bbccecf27950c2', {
            cluster: 'ap2'
        });
    
        var channel = pusher.subscribe('rooms');
        channel.bind('inserted', async function(newRoom) {
            await axiosGet()
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])

    useEffect(() => {
        var pusher = new Pusher('907ee6bbccecf27950c2', {
            cluster: 'ap2'
        });
        
        var channel = pusher.subscribe('chatMessage');
        channel.bind('updated', async function(newMessage) {
            await axiosGet()
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])

    useEffect(() => {
        var pusher = new Pusher('907ee6bbccecf27950c2', {
            cluster: 'ap2'
        });
    
        var channel = pusher.subscribe('userAdded');
        channel.bind('updated', async function(newRooms) {
            await axiosGet()
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])


    async function createPersonalChat() {
        const newContact = prompt("Enter email")
        if(newContact !== null && newContact.length > 0){
            await axios.post("/" + props.user.user._id + "/addPersonalChat", {
                newContact: newContact
            }).then((response) => {
                console.log(response);
                if(response.data === "does not exist") alert("User does not exist!")
            })
        }
    }


    

    return (
        <div class="sidebar">
            <div className="sidebar-header">
                <IconButton>
                    <Avatar src={props.user.photoURL}/>
                </IconButton>
                <div className="sidebar-header-right">
                    <IconButton  onClick={createPersonalChat}>
                        <PersonAddIcon className="custom-button"/>
                    </IconButton> 
                    
                    <Link to="/">
                        <IconButton >
                            <ExitToAppRoundedIcon onClick={()=>{props.setUser(null)}} className="custom-button"/>
                        </IconButton>
                    </Link>
                </div>
            </div>
            
            <div className="sidebar-chats">
                <SidebarChat addNewChat={true}
                    user={props.user}/>

                {
                    rooms.map(room => (
                        room.type ?
                        
                            <SidebarPersonalChat 
                                key={room._id} 
                                id={room._id}
                                member1={room.member1}
                                member2={room.member2}
                                lastMessage={room.lastMessage}
                                user={props.user}
                            /> 
                            
                            :

                            <SidebarChat 
                                addNewChat={false} 
                                key= {room._id} 
                                id = {room._id} 
                                roomName= {room.roomName} 
                                lastMessage={room.lastMessage} 
                                user={props.user}
                            />

                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;