import React, {useState, useEffect} from 'react'
import {Jumbotron} from 'reactstrap'
import axios from '../config/axios'
import { useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'


export default function Profile() {

    const [user, setUser] = useState({})
    const token = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [avatarlink, setAvatarlink] = useState('')
    const {id, username, name , email, main_address, address2, address3} = user

    useEffect(() => {
        const config = { headers: { Authorization : token } }

        axios.get(`/user/profile`, config)
            .then(res => {
                setUser(res.data.user)
                setAvatarlink(res.data.avatarlink)
            })
            .catch(err => console.log(err))
        
    }, [])


    return userName ?(
        <div className="container">
            <Jumbotron>
                <img src={avatarlink} alt={name}/>
                <h1>Hello, {name}</h1>
                <p>{username} | {email}</p>
                <p>Alamat Utama: {main_address}</p>
                <p>Alamat kedua: {address2}</p>
                <p>Alamat ketiga: {address3}</p>
                <Link to='/editprofile'>
                    <button type="button" className="btn btn-outline-primary btn-lg" >update Profile</button>
                </Link>
            </Jumbotron>
        </div>
    ) : (
        <Redirect to='/login' />
    )
}
