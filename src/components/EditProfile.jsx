import React, {useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from '../config/axios'
import {Redirect} from 'react-router-dom'
import { loginAction } from '../config/redux/actions'
import Swal from 'sweetalert2'


export default function EditProfile() {

    const [user, setUser] = useState({})
    const [gender, setGender] = useState('')
    const [avatarlink, setAvatarlink] = useState('')
    const token = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const id = useSelector(state => state.auth.id)
    const dispatch = useDispatch()
    const {phone_number, email, main_address, address2, address3, name } = user

    // console.log(gender)

    const userNameRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()
    const phoneRef = useRef()
    const mainAddressRef = useRef()
    const secondAddressRef = useRef()
    const thirdAddressRef = useRef()
    const imageRef = useRef()

    useEffect(() => {
        const config = { headers: {Authorization : token}}
        axios.get('/user/profile', config)
        .then(res => {
            setUser(res.data.user)
            setGender(res.data.user.gender)
            setAvatarlink(res.data.avatarlink)
        })
        .catch(err => console.log(err))
    },[])
    
    const changeImage = (e) => {
    
        setAvatarlink(URL.createObjectURL(e.target.files[0]))
    
    }

    const updateAvatar = () => {
        const body = new FormData()

        let image = imageRef.current.files[0]

        body.append("avatar", image)

        const config = {headers: {Authorization : token}}

        axios.post('user/avatar', body, config)
        // pakai sweetalert?
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Your photo has been changed',
                showConfirmButton: false,
                timer: 1500
            })
    })
        .catch(err => console.log(err))
    }

    const update = (config) => {
        const body = {
            username : userNameRef.current.value,
            phone_number : phoneRef.current.value,
            gender,
            email : emailRef.current.value,
            main_address : mainAddressRef.current.value,
            address2 : secondAddressRef.current.value,
            address3 : thirdAddressRef.current.value,
            name : nameRef.current.value
        }

        axios.patch('/user/profile', body, config)
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Your data has been updated',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('data berhasil di update');
            // mengganti username baik itu di redux maupun di localstorage
            dispatch(loginAction({id, username: body.username, token}))
        })
        .catch(err => console.log(err))
    }

    const updateData = () => {
        const config = {headers: { Authorization : token}}
        
        const data = {
            oldPassword: oldPasswordRef.current.value,
            newPassword : newPasswordRef.current.value,
            id 
        }


        // jika password ada isinya
        // bandingkan password lama
        if(data.oldPassword && data.newPassword){
            // config tidak diperlukan lagi, kecuali di router memakai auth lagi
            return axios.post('/user/changepassword', data, config)
        .then(res => {
            // kalau sudah di hash di register
            console.log(res.data)
            if(res.data == false) return alert('password lama yang anda masukkan salah')
            // if(res.data == false) return alert('password lama yang anda masukkan salah');

            update(config)
        })
        .catch(err => console.log(err))
        // jika hanya salah satu yang di isi
        } else if((!data.oldPassword && data.newPassword) || (data.oldPassword && !data.newPassword) ) return alert('silahkan isi password lama dan password baru untuk melakukan pergantian password')

        update(config)
    }


    return userName ? (
        // belum ada code yang mewajibkan org login baru bisa akses halaman ini
        <div className="container">
                <form>

                    <div className="figure-img">
                        <img width="200" src={avatarlink} />
                    </div>
                    <div className="form-group">
                        <input type="file" ref={imageRef} onChange={changeImage}/>
                    </div>

                    <input onClick={updateAvatar} className="btn btn-outline-primary my-3"  type="button" value="Update foto"/>

                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" ref={userNameRef} defaultValue={userName} />
                    </div>

                    <div className="form-group">
                        <label>Nama</label>
                        <input type="text" className="form-control" ref={nameRef} defaultValue={name} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" ref={emailRef} defaultValue={email} />
                    </div>

                    <div className="my-3">
                            <p>Pilih Gender</p>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="pria" value="M" onChange={() => setGender('M')}/>
                                <label className="form-check-label" >
                                    Pria
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="wanita" value="F" onChange={() => setGender('F')} />
                                <label className="form-check-label" >
                                    Wanita
                                </label>
                            </div>
                    </div>

                    <div className="form-group">
                        <label>Password Lama</label>
                        <input type="password" className="form-control" ref={oldPasswordRef} placeholder="Password Lama" />
                    </div>

                    <div className="form-group">
                        <label>Password Baru</label>
                        <input type="password" className="form-control" ref={newPasswordRef} placeholder="Password Baru" />
                    </div>

                    <div className="form-group">
                        <label>Nomor Telepon</label>
                        <input type="text" className="form-control" ref={phoneRef} defaultValue={phone_number} />
                    </div>

                    <div className="form-group">
                        <label>Alamat Utama</label>
                        <input type="text" className="form-control" ref={mainAddressRef} defaultValue={main_address} />
                    </div>
                    <div className="form-group">
                        <label>Alamat Kedua</label>
                        <input type="text" className="form-control" ref={secondAddressRef} defaultValue={address2} />
                    </div>
                    <div className="form-group">
                        <label>Alamat Ketiga</label>
                        <input type="text" className="form-control" ref={thirdAddressRef} defaultValue={address3} />
                    </div>
                
                    <input onClick={updateData} className="btn btn-outline-primary"  type="button" value="Update data"/>
                </form>
        </div>
    ) : (
        // jangan lupa ganti k home
            <Redirect to="/login" />
        )
}

// set alamat ke dalam array, lalu d mapping buat menampilkan return
