import React, {useEffect, useState} from 'react'
import Footer from '../components/Footer';
import ItemProduct from '../components/ItemProduct';
import axios from '../config/axios'
import { Redirect } from 'react-router-dom';

import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

import { useSelector } from 'react-redux'


export default function Home() {
    console.log('Home');

    const token = useSelector(state => state.auth.token)
    const idUser = useSelector(state => state.auth.id)
    const username = useSelector(state => state.auth.username)

    const [product, setProduct] = useState([])
    const [pictureProduct, setPictureProduct] = useState()
    const [whislist, setWhislist] = useState([])

    const [startProduct, setStartProduct] = useState(0)


    useEffect(() => {
        getProducts();
        getWhislist();
    },[])

    const getProducts = () =>{
        axios.get(`/products/readuser/${startProduct}`).then((res) =>{
            setProduct(res.data.result);
            setPictureProduct(`${res.data.picturelink}?unq=${new Date()}`)
        }).catch(err => console.log({err}))
    }

    const getWhislist = () =>{
        axios.get('/whislist').then((res) =>{
            setWhislist(res.data.result);
        }).catch(err => console.log({err}))
    }

    const renderWhislist = () =>{
        return <ItemProduct propsProduct={product} propsPicture={pictureProduct} propsLoveClick={loveClick}/>
    }

    const loveClick = (productId) =>{
        
        if(!username){
            return <Redirect to="/login" />
        } else{
            let resultFilter = []
            let resultFilterProductId = []

            resultFilter = whislist.filter((productWhislist) =>{
                return  productWhislist.user_id === idUser ;
            })

            if (resultFilter.length > 0) {

                resultFilterProductId =  resultFilter.filter(productWhislist =>{
                    return productWhislist.product_id === productId
                })

                if (resultFilterProductId.length > 0) {

                    resultFilterProductId.map((productWhislist) => {
            
                        const config = { headers: {Authorization : token}}
                        let status_whistlist_product;

                        if (productWhislist.status_whistlist_product) {
                                        status_whistlist_product = 0
                        } else if(!productWhislist.status_whistlist_produc){
                                        status_whistlist_product = 1
                        }

                        let body = {status_whistlist_product}
                        axios.patch(`/whislist/${productWhislist.whislist_id}/${productId}`, body, config).then((res)=>{
                        axios.delete(`/whislist/delete/${0}`, config)
                        .then((res) =>{ }).catch(err => console.log({err}))
                            getWhislist()
                            getProducts()
                        }).catch(err => console.log({err}))
                    })
                 
                } else{
                    const config = { headers: {Authorization : token}}
                    let body = 0
            
                    axios.post(`/whislist/addwhislist/${productId}`, body, config)
                    .then((res)=>{
                        getWhislist()
                         getProducts()
                    }).catch(err => console.log({err}))
                }

    
            } else{
                console.log("data baru akan masuk");
                const config = { headers: {Authorization : token}}
                let body = 0

                axios.post(`/whislist/addwhislist/${productId}`, body, config).then((res)=>{
                    console.log(`tambah data benar" baru   `, {res});
                 
                    getWhislist()
                }).catch(err => console.log({err}))
            }
        }

       
    }


    const paginationLeft = () =>{
        if (startProduct == 0 || startProduct <= 9) {
            setStartProduct(0)
            getProducts()
            renderWhislist()
        } else if(startProduct >= 10){
            const leftStart = startProduct - 10
            setStartProduct(leftStart)
            getProducts()
            renderWhislist()
        }
        
    }
    
    const paginationRight = () =>{
        const rightStart = startProduct + 10
        setStartProduct(rightStart)
        getProducts()
        renderWhislist()
    }
    
    return (
        <div className="pb-2">
            {renderWhislist()}
        <div className="row text-center mx-auto">
            <span><FaRegArrowAltCircleLeft onClick={paginationLeft}/> <FaRegArrowAltCircleRight  onClick={paginationRight}/></span>
        </div>
            <Footer />
        </div>
    )
}