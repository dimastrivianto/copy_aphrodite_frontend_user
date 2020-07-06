import React from 'react'
import {Link} from 'react-router-dom'

import NotFoundImg from '../assets/images/page_not_found.svg'

export default function NotFound() {
    return (
        <div className="d-flex justify-content-center mt-5">
        <div className="card shadow p-5" style={{width: '100vh', background:'#FFE3F1', border: '1px solid #EC4B8A'}}>
            <img src={NotFoundImg} className="figure-img img-fluid rounded" alt="gambar not found"/>
            <div className="card-body text-center">
                <h5 className="card-title"style={{color: '#EC4B8A'}}>Maaf halaman yang Anda cari tidak ditemukan.</h5>
                <Link to={`/`}>          
                    <button type="button" className="btn" style={{backgroundColor: '#EC4B8A', color: 'white', width:150}} > Go Home</button>
                </Link>
            </div>
        </div>
        </div>
    )
}
