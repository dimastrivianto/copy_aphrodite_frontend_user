import React, {useState, useEffect} from 'react'
import axios from '../config/axios/'
import {Link} from 'react-router-dom'

export default function Paket() {

    const [packages, setPackages] = useState([])
    console.log(packages)

    useEffect(() => {
        axios.get('/user/all/package')
        .then(res => setPackages(res.data))
        .catch(err => console.log({err}))
    }, [])

    const renderPackage = () => {
        return packages.map((product) => {
            const image = `http://localhost:2020/product/picture/${product.picture}`
            return (
                <div key={product.id} className="card col-lg-2 col-xl-2 mx-auto mx-xl-auto my-3">
                    <img className="card-img-top" src={image} alt={product.name} style={{height: 200}}/>
                    <div className="card-body">
                        <div  style={{height: 50}}>
                                <h5 className="card-title">{product.name}</h5>
                        </div>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">Rp. {product.price}</p>
                        <Link to={`/detailpackage/${product.id}`}>
                                <button className="btn btn-secondary btn-block my-2">Detail</button>
                        </Link>
                    </div>
                </div>
            ) 
        })
    }

    return (
        <div className="container-fluid" >
            <h1 className="text-center mb-5">PACKAGE</h1>
            <div className="row">
                {renderPackage()}
            </div>
        </div>
    )
}
