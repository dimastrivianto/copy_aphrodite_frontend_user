import React,{useState, useEffect} from 'react'
import StarRatings from 'react-star-ratings';
import { FaHeart } from 'react-icons/fa';
import {Link} from 'react-router-dom'


export default function ItemProduct(props) {

    const [statusWhislist, setStatusWhislist] = useState(0)

    const [productId, setProductId] = useState()

    const clickedLove = (productId) =>{
        props.propsLoveClick(productId)
        setProductId(productId)

        statusWhislist ? setStatusWhislist(0) : setStatusWhislist(1) 
    }

    const urlImage = `http://localhost:2020/product/picture`

    const images = props.propsProduct.map(( productMap, index)=>{

        let rating = productMap.rating
        let price = productMap.price
        let priceId = price.toLocaleString('id-ID')
 
    
        if (!(typeof productMap.status_whistlist_product == 'undefined')){
            if (productMap.product_id == productId) {
                return (
                    <div className="col-2" key={index}> 
                        <div className="card itemProduct shadow-sm mb-3" style={{width: '10rem'}} >
                            <img src={`${urlImage}/${productMap.picture}`}  style={{height: '7rem'}} className="card-img-top" alt={productMap.picture}/>
                            <div className="clickLove" onClick={() => { clickedLove(productMap.id) }} >
                         
                                {statusWhislist ? <FaHeart className="iconLove"/> : <FaHeart  color={"transparent"} className="iconLove"/>  }
                        
                            </div>
                            <div className="card-body ">
                                <p className="itemProduct-Title " style={{haxHeight:'.5rem', overflow: 'hidden', textOverflow:'ellipse'}}>{productMap.title}</p>
                                <p className="itemProduct-Price">Rp {priceId}</p>
                                <div className="d-flex itemProduct-Rating ">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="1px"
                                    />
                                    <span style={{fontSize: 14, display: 'inline-block', marginTop: 5}}>({rating})</span>
                                </div>
                                <div className="d-flex justify-content-center mb-2">
                                    <Link to={`/detailitem/${productMap.id}`}>
                                        <button type="button" className="btn btn-outline-primary btn-outline-beli ">Detail</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    
    return (
        <div className="col-2 mx-2 px-0" key={index}> 
            <div className="card itemProduct shadow-sm mb-3" style={{width: '10rem'}} >
                <img src={`${urlImage}/${productMap.picture}`}  style={{height: '7rem'}} className="card-img-top" alt={productMap.picture}/>
               
                <div className="clickLove" onClick={() => { clickedLove(productMap.id) }} >
                    {productMap.status_whistlist_product ? <FaHeart onClick={console.log('klikked -- ' + index)} className="iconLove"/> : <FaHeart  color={"transparent"} className="iconLove"/>  }
                </div>
                <div className="card-body ">
                    <p className="itemProduct-Title " style={{haxHeight:'.5rem', overflow: 'hidden', textOverflow:'ellipse'}}>{productMap.name}</p>
                    <p className="itemProduct-Price">Rp {priceId}</p>
                    <p className="d-flex itemProduct-Rating ">
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="1px"
                        />
                        <span style={{fontSize: 14, display: 'inline-block', marginTop: 5}}>({rating})</span>
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                        <button type="button" className="btn btn-outline-primary btn-outline-beli ">Beli</button>
                    </div>
                </div>
            </div>
        </div>
    )

    }
    )

    return(
        <div className="mx-auto row pb-4">
            {images}
        </div>
    )
}
   



