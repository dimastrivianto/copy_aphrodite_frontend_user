import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../config/axios/'
import {Redirect} from 'react-router-dom'


export default function Cart() {
    
    const [carts, setCarts] = useState([])
    const [user, setUser] = useState({})
    const [discount, setDiscount] = useState('')
    const token = useSelector(state => state.auth.token)
    const username = useSelector(state => state.auth.username)
    const id = useSelector(state => state.auth.id)
    
    const selectRef = useRef()
    
    useEffect(() => {
        getCartAndDiscount();
    },[])
    
    console.log(user)
    const getCartAndDiscount = () => {
        const config = {headers: {Authorization: token}}
        axios.get(`/user/carts/${id}`, config)
        .then( res => {setCarts(res.data);
            axios.get('/user/discount', config)
            .then(res => {
                setDiscount(res.data);
                axios.get('/user/profile', config)
                .then(res => setUser({main_address: res.data.user.main_address, address2 :res.data.user.address2, address3 : res.data.user.address3}))
                .catch(err => console.log(err))
            })
            .catch(err => console.log({err}))
        })
        .catch(err => console.log(err))
    }
    
    const deleteProductCart = (product_id, qty, product_type) =>{
        const config = {
            headers: {Authorization: token},
            data : {product_id, qty, product_type}
        }
        axios.delete('/user/carts', config)
        .then(res => {
            console.log(res.data);
            getCartAndDiscount()    
        })
        .catch(err => console.log({err}))
    }
    
    const checkOut = () => {
        const shippingAddress = selectRef.current.value
        console.log(shippingAddress)

        let total_amount = 0
        carts.map((product) => {
            total_amount += product.total_product_amount
        })
        const config = {headers: {Authorization: token}}
        const body = {
            total_amount,
            carts,
            shippingAddress
        }
        axios.post('/user/transaction', body, config)
        .then(res => {
            console.log(res.data);
            getCartAndDiscount();
            
        })
        .catch(err => console.log({err}))
    }

    const renderCart = () => {
        // Object { id: 21, name: "paket cincin", user_id: 7, product_id: 37, qty: 1, price: 200000, total_product_amount: 200000 }
        return carts.map((cart) => {
            return(
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>
                    <td>{cart.description}</td>
                    <td>Rp. {cart.price.toLocaleString('in')}</td>
                    <td>{cart.qty}</td>
                    <td>Rp. {cart.total_product_amount.toLocaleString('in')}</td>
                    {/* <td><img width="50" src={product.src} alt=""/></td> */}
                    <td><img width="70" className="list" src={`http://localhost:2020/product/picture/${cart.picture}`} /></td>
                    <td>
                        <button  className="btn btn-danger btn-block btn-lg mt-3" onClick={() => {deleteProductCart(cart.product_id, cart.qty, cart.product_type)}} >Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const renderCheckout = () => {
        let totalPrice = 0
            let renderPrice = carts.map((product) => {
            let total =  product.total_product_amount
            totalPrice += total
                // console.log(totalPrice, product.total_product_amount)
            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.qty}</td>
                    <td>Rp. {product.price.toLocaleString('in')}</td>
                    <td>Rp. {total.toLocaleString('in')}</td>
                </tr>
            )
        })
        let totalDiscount = 0
        if(discount) {
            totalDiscount = (discount.numbers / 100 * totalPrice)
            totalPrice = totalPrice - totalDiscount
            
        }
        
        return(
            <div className="container">
                <h1 className="display-4">TOTAL</h1>
                <table className="table text-center table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">ID</th>
                            <th scope="col" className="col-3">NAME</th>
                            <th scope="col" className="col-3">QTY</th>
                            <th scope="col" className="col-2">PRICE</th>
                            <th scope="col" className="col-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPrice}
                        <tr>
                            <td colSpan="4">discount</td>
                            <td colSpan="1">Rp. {totalDiscount.toLocaleString('in')}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Total</td>
                            <td colSpan="1">Rp. {totalPrice.toLocaleString('in')}</td>
                        </tr>
                        <tr>
                            <td colSpan="1">Shipping Address: </td>
                            <td colSpan="4">
                                <select className="form-control" ref={selectRef} name="shippingAddress">
                                    <option value={user.main_address} selected="selected">{user.main_address}</option>
                                    <option value={user.address2}>{user.address2}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <button onClick={checkOut} type="button" className="btn btn-outline-primary btn-block mx-auto btn-lg checkout" >Checkout</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    
    
    return username ? (
        <div className="container">
            {/* List Cart */}
            <h1 className="display-4">Cart</h1>
            <table className="table table-hover mb-5">
                <thead>
                    <tr>
                        <th scope="col" className="col-1">ID</th>
                        <th scope="col" className="col-2">NAME</th>
                        <th scope="col" className="col-4">DESC</th>
                        <th scope="col" className="col-2">PRICE</th>
                        <th scope="col" className="col-1">QTY</th>
                        <th scope="col" className="col-2">TOTAL AMOUNT</th>
                        <th scope="col" className="col-2">PICTURE</th>
                        <th scope="col" className="col-2">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCart()}
                </tbody>
            </table>
            <table>
            {/* CHeckout */}
                {renderCheckout()}
            </table>
        </div>
    ) : (
            <Redirect to="/login" />
        )
}
