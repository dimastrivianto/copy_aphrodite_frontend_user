import React, {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import axios from '../config/axios'
import {loginAction} from '../config/redux/actions' 

function Login() {

    const dataRef = useRef()
    const passwordRef = useRef()

    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.username )

    const onButtonClick = () => {
        const password = passwordRef.current.value
        const patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        // return console.log(patt.test(dataRef.current.value));
        
        if (patt.test(dataRef.current.value)) {
            const email = dataRef.current.value
            return axios.post('/user/login', {email, password})
            .then(({data : {token, user : {id, username}}}) => {
            // simpan ke redux
            dispatch(loginAction({id, username, token}))

            })
            .catch(err => alert(err))
        }
        
        else if (!patt.test(dataRef.current.value)) {
            const username = dataRef.current.value
            return axios.post('/user/login', {username, password})
            .then(({data : {token, user : {id, username}}}) => {
            // // simpan ke redux
            dispatch(loginAction({id, username, token}))

            })
            .catch(err => alert(err))
        }
        
        
        
    }
    
    return (
        !username ? (<div className="mt-5 row">
            <div className="col-sm-3 mx-auto card">
                <div className="card-body">
                    <div className="border-bottom border-secondary card-title">
                        <h1>Login</h1>
                    </div>
                    <div className="card-title mt-1">
                        <h4>Username Or Email</h4>
                    </div>
                    <form className="input-group"><input ref={dataRef} className="form-control" type="text"/></form>
                    <div className="card-title mt-1">
                        <h4>Password</h4>
                    </div>
                    <form className="input-group"><input ref={passwordRef} className="form-control" type="password"/></form>
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-success btn-block" onClick={onButtonClick}>Login</button>
                    </div>
                    {/* {this.onErrorLogin()} */}
                    <p className="lead">Don't have account ? <Link to="/register">Sign Up!</Link></p>
                    <div>
                        <p>Lupa password? <Link to="/inputemail">Ganti Password</Link></p>
                    </div>
                </div>
            </div>
        </div>) : (
            <Redirect to='/' />
        )

    )
}


export default Login
