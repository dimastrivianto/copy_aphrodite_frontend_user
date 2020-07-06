import React,{useState , useRef} from 'react'
import axios from '../config/axios'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

export default function UploadPayment() {

    const token = useSelector(state => state.auth.token)

    const {idtransaction} = useParams()
    const pictureRef = useRef();
    const [file, setFile] = useState()

    const handleChange = (event) =>{
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    const onHandleUpload = (event) =>{
 
        const config = { headers: { Authorization : token } }

        const body = new FormData()

        let picture = pictureRef.current.files[0]

        body.append("payment_image", picture)

        axios.post(`/transaction/uploadpayment/${idtransaction}`,body, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return (
            <div className="my-5">
                <h3>Silahkan Upload bukti <b>Pembayaran</b> yang telah anda lakukan di sini:</h3>
                <div className="card shadow mx-auto text-center" style={{width: '25rem', height: '34rem'}}>
                    <img className="card-img-top" src={file} style={{width: '25rem', height: '23rem'}}/>
                    <div className="card-body py-3">
                        <h5 className="card-title ml-0">Silahkan Tekan Dibawah Ini:</h5>
                        <input type="file" ref={pictureRef} className="ml-5 pl-3" name="payment_image" onChange={handleChange}/>
                        <input type="button" onClick={onHandleUpload} className="btn my-3 " style={{backgroundColor: '#EC4B8A', color: 'white', width:250}} value="Upload Bukti Pembayaran"/>
                    </div>
                </div>
            </div>
    )
}
