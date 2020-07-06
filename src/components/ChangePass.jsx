import React, {useState, useRef} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import axios from '../config/axios'
import Swal from 'sweetalert2'

export default function ChangePass() {

    let {token, id} = useParams()

    const firstPasswordRef = useRef()
    const secondPasswordRef = useRef()
    const [success, setSuccess] = useState(false)
    // console.log({id})
    const changePass = () => {
        const firstPass = firstPasswordRef.current.value
        const secondPass = secondPasswordRef.current.value

        if(firstPass == secondPass) {
            const body = {secondPass}
            return axios.patch(`/user/password/${token}/${id}`, body)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your password has been changed',
                    showConfirmButton: false,
                    timer: 1500
                })
                setSuccess(true)
            })
            .catch(err => console.log(err))
        }
        alert('password yang anda masukkan tidak sama')
    }

    
    return (
        !success ?
        (<div className="mt-5 row">
            <div className="col-sm-3 mx-auto card">
                <div className="card-body">
                    <div className="card-title mt-1">
                        <h4>Masukkan password baru anda:</h4>
                    </div>
                    <form className="input-group">
                        <input ref={firstPasswordRef} className="form-control" type="password"/>
                    </form>
                    <div className="card-title mt-1">
                        <h4>Masukkan password baru anda sekali lagi:</h4>
                    </div>
                    <form className="input-group">
                        <input ref={secondPasswordRef} className="form-control" type="password"/>
                    </form>
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-success btn-block" onClick={changePass}>Ganti Password</button>
                    </div>
                </div>
            </div>
        </div>) : (
            <Redirect to='/login'/>
        )
    )
}
