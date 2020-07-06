import React, {useState, useEffect, useRef} from 'react'
import axios from '../config/axios/'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function DetailItem() {

    const [product, setProduct] = useState({})
    const [picturelink, setPicturelink] = useState('')
    const username = useSelector(state => state.auth.username)
    const token = useSelector(state => state.auth.token)
    const {id} = useParams()
    const {name, picture, description, stock_app, price, rating, total_buyer, total_buyer_rating}= product

    const qtyRef = useRef()

    const getData = () => {
        axios.get(`/user/product/${id}`)
        .then(res => {
            setProduct(res.data.result);
            setPicturelink(res.data.picturelink);
        })
        .catch(err => console.log({err}))
    }

    useEffect(() => {
        getData()
    }, [])

    const addToCart = () => {
        if(stock_app == 0) {
            return alert('stock sudah habis')
        }
        let qty = qtyRef.current.value
        let total_product_amount = qty * product.price
        const config = {headers : {Authorization : token}}
        const body = {
            qty,
            name : product.name,
            description : product.description,
            price : product.price, 
            total_product_amount,
            id,
            product_type : product.product_type
        }
        
        axios.post('/user/cart', body, config)
        .then(res => {
            const config = {headers : {Authorization: token}}
            const body = {
                stock_app : product.stock_app - qty,
                product_id : id
            }
            axios.patch('/user/qtysubstraction', body, config)
                .then(res => {
                    console.log(res.data);
                    getData()
                })
                .catch(err => console.log({err}))
        })
        .catch(err => console.log({err})
        )
    }
    
    return username ? (
        <div className="container-fluid">
            <div className="row">
                <div className="card col-5 mx-auto my-3 ">
                    <img className="card-img-top" src={picturelink} alt=""/>
                    <div className="card-body">
                        <div  style={{height: 50}}>
                            <h5 className="card-title">{name}</h5>
                        </div>
                        <p className="card-text">Description: {description}</p>
                        <p className="card-text">Price: Rp. {price}</p>
                        <p className="card-text">Stock: {stock_app}</p>
                        <input className="form-control" type="number" placeholder="Jumlah Qty" ref={qtyRef} defaultValue={1}/>
                        <button className="btn btn-primary btn-block" onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
    <div className="container-fluid">
        <div className="row">
            <div className="card col-5 mx-auto my-3 ">
                <img className="card-img-top" src={picturelink} alt=""/>
                <div className="card-body">
                    <div  style={{height: 50}}>
                        <h5 className="card-title">{name}</h5>
                    </div>
                    <p className="card-text">Description: {description}</p>
                    <p className="card-text">Price: Rp. {price}</p>
                    <p className="card-text">Stock: {stock_app}</p>
                    <input className="form-control" type="number" placeholder="Jumlah Qty"/>
                    <button className="btn btn-primary btn-block" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
    )
}
