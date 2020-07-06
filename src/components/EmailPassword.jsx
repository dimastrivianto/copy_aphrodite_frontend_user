import React, { useRef } from 'react'
import axios from '../config/axios/'


export default function EmailPassword() {
    const emailRef = useRef()

    const handleSubmit = () => {
        const body= {email: emailRef.current.value}

        axios.post('/user/forgotpassword', body)
        .then(res => alert('Silahkan cek email anda untuk mengganti password'))
        .catch(err => console.log(err))
    }

    return (
        (<div className="mt-5 row">
            <div className="col-sm-3 mx-auto card">
                <div className="card-body">
                    <div className="card-title mt-1">
                        <h4>Masukkan email anda:</h4>
                    </div>
                    <form className="input-group">
                        <input ref={emailRef} className="form-control" type="email"/>
                    </form>
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-success btn-block" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>)
    )
}
