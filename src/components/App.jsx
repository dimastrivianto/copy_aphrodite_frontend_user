import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loginAction} from '../config/redux/actions'

//components
import EditProfile from './EditProfile'
import Login from './Login'
import EmailPassword from './EmailPassword'
import ChangePass from './ChangePass'
import Profile from './Profile'
import Discount from './Discount'
import DetailItem from './DetailItem'
import DetailPackage from './DetailPackage'
import Cart from './Cart'
import Register from '../pages/Register'
import Wishlist from '../pages/Wishlist'
import Home from '../pages/Home'
import Header from './Header'
import NotFound from '../pages/404'
import Paket from './Paket'

import Transaction from '../pages/Transaction'
import UploadPayment from '../pages/UploadPayment'
import CategoryNavbarKeyword from '../pages/CategoryNavbarKeyword'

// CSS
// import '../assets/style/App.css'



export default function App() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) dispatch(loginAction(user)) 
        setLoading(false)

    }, [])

    return loading ? (
        <h1 className="text-center">L O A D I N G ...</h1>
    ) : (
        <BrowserRouter>
            <div className="container-fluid">
                <Header/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/editprofile" component={EditProfile}/>    
                    <Route path="/login" component={Login}/>    
                    <Route path="/inputemail" component={EmailPassword}/>    
                    {/* <Route path="/changepass/:id" component={ChangePass}/>     */}
                    <Route path="/profile" component={Profile}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/paket" component={Paket}/>
                    <Route path="/discount" component={Discount}/> 
                    <Route path="/detailitem/:id" component={DetailItem}/>
                    <Route path="/detailpackage/:id" component={DetailPackage}/>
                    <Route path="/changepass/:token/:id" component={ChangePass}/> 
                    <Route path="/register" component={Register}/>
                    <Route path="/wishlist" component={Wishlist}/>
                    <Route path="/transaction" component={Transaction}/>
                    <Route path="/uploadtransfer/:idtransaction" component={UploadPayment}/>
                    <Route path="/categorynavbarkeyword/:productname" component={CategoryNavbarKeyword}/>
                    <Route component={NotFound}/>    
                </Switch>
            </div>

        </BrowserRouter>
    )
}
