import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from '../config/axios'
import ItemProduct from '../components/ItemProduct';

export default function CategoryNavbarKeyword() {

    const [product, setProduct] = useState([])
    const [pictureProduct, setPictureProduct] = useState()
    const {productname} = useParams()

    useEffect(() => {
        getProduct();
    },[])
  
    const getProduct = () =>{

        axios.get(`/products/readusernavbar/${productname}`)
        .then(res => { console.log(res.data.result);
        
            // setProduct(res.data.result)
            // setPictureProduct(`${res.data.picturelink}?unq=${new Date()}`)
            // console.log(res.data.result);
            
        } 
)
        .catch(err => console.log(err))

        console.log(product);
        
    }

    const renderWhislist = () =>{
        return <ItemProduct propsProduct={product} propsPicture={pictureProduct} propsLoveClick={loveClick}/>
    }

    const loveClick = () => {}

    return (
        <div>
     {/* {renderWhislist()}        */}
        </div>
    )
}
