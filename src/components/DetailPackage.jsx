import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from '../config/axios/'
import { useSelector } from 'react-redux'


export default function DetailPackage() {

    const [paket, setPaket] = useState([])
    const token = useSelector(state => state.auth.token)
    const username = useSelector(state => state.auth.username)
    const {id} = useParams()

    const qtyRef = useRef()

        console.log(paket)

    useEffect(() => {
        axios.get(`/user/package/${id}`)
        .then(res => {
            setPaket(res.data);
            // console.log(res.data)
        })
        .catch(err => console.log({err}))
    }, [])

    const addToCart = () => {
        let qty = qtyRef.current.value
        let total_product_amount = 0
        let price = 0
        for(let content of paket) {
            price += content.price
        }
        total_product_amount = qty *price
        // console.log(qty, price, total_product_amount, id)
        const config = {headers : {Authorization: token}}
        
        let product_id = paket.map((content) =>{
            return content.product_id
        })
        
        let qtyStockProduct_id = paket.map((content) => {
            return {stock_app: content.stock_app-qty, product_id: content.product_id}
        })
        
        const data = {qty, name: paket[0].packages, description: paket[0].package_description, price, total_product_amount, id, product_id: product_id, product_type : paket[0].product_type}
        console.log(data)
        axios.post('/user/cart', data, config)
        .then(res => {
            
            qtyStockProduct_id.forEach((product) => {
                const config = {headers : {Authorization: token}}

                axios.patch('/user/qtysubstraction', product, config)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))

    }

    const renderList = () => {
        // console.log(paket)
        return paket.map((content) => {
            const image = `http://localhost:2020/product/picture/${content.picture}` 
            if(content == 'barang tidak tersedia'){
                return <h1 className="text-center mt-5">Saat ini paket tidak tersedia, silahkan pilih paket lain atau beli produk secara satuan</h1>
            }
            return (   
                    <div key={content.product_id} className="card col-lg-2 col-xl-2 mx-auto my-3">
                        <img className="card-img-top" src={image} alt={content.name} style={{height: 250}}/>
                        <div className="card-body">
                            <div  style={{height: 50}}>
                                    <h5 className="card-title">{content.name}</h5>
                            </div>
                            <p className="card-text">Description: {content.description}</p>
                            <p className="card-text">Price: Rp. {content.price}</p>
                            <Link to={`/detailitem/${content.product_id}`}>
                                    <button className="btn btn-secondary btn-block my-2">Detail</button>
                            </Link>
                        </div>
                    </div>
            )
        })
        
    }

    if(username){
        if(paket[0] == 'barang tidak tersedia') {
            return(
                <div className="container-fluid">
                    <h1 className="text-center">Detail Package</h1>
                    {renderList()} 
                </div>
            )
        }
    return(
        <div className="container-fluid">
                <h1 className="text-center">Detail Package</h1>
            <div className="row">
                {renderList()} 
            </div>
            <h4>Jumlah Qty:</h4>
            <input className="form-control" type="number" placeholder="Jumlah Qty" ref={qtyRef} defaultValue={1}/>
            <button className="btn btn-primary btn-lg" onClick={addToCart} >Add package to Cart</button>
        </div>
    )
    }else { 
    return( 
        <div className="container-fluid">
                <h1 className="text-center">Detail Package</h1>
            <div className="row">
                {renderList()}
            </div> 
            <button className="btn btn-primary btn-lg" disabled >Add package to Cart</button>
        </div>
    )
    }
}
