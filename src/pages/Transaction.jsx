import React, { useState, useEffect  } from 'react'
import { useSelector } from 'react-redux'
import axios from '../config/axios/index'
import {Link} from 'react-router-dom'
import ModalRating from '../components/ModalRating'
import StarRatings from 'react-star-ratings';

export default function Transaction() {

    const token = useSelector(state => state.auth.token)
    const config = { headers: { Authorization : token } }
    const [transaction, setTransaction] = useState([])
    const [modal, setModal] = useState(false)
    const [idTransaction, setIdTransaction] = useState()

    useEffect (() =>{
        getTransaction()
    },[])

    const getTransaction = () =>{

        axios.get('/transaction/readuser', config).then(res => {
           setTransaction(res.data)
        })
        .catch(err => console.log(err)
        )
    }

    const onHandleOpenModalRating = (idtransaction) =>{
        setModal(true)
        setIdTransaction(idtransaction) 
    }

    const onHandleSaveModalRating = (idtransaction, inputRating) => {
        setModal(false)

        let idproductx;
        let ratingx;
        let totalratingx;
        let totalbuyerratingx;
        let ratingstatusx;
        let ratingtransactionx;

        axios.get(`/rating/readuser/${idtransaction}`, config )
        .then(res => {
         
            idproductx = res.data[0].id
            ratingx = res.data[0].rating
            totalratingx = (res.data[0].tota_rating) + parseInt(inputRating)
            totalbuyerratingx = (res.data[0].total_buyer_rating) + 1
            ratingstatusx = 1
            ratingtransactionx = parseInt(inputRating)

            ratingx = totalratingx  / totalbuyerratingx
            ratingx = Math.round(ratingx)

            const body  = {rating: ratingx ,rating_status: ratingstatusx ,  rating_transaction: ratingtransactionx ,tota_rating: totalratingx ,total_buyer_rating: totalbuyerratingx }
            
            axios.patch(`/rating/updateuser/${idproductx}/${idtransaction}`,body, config)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })       
        .catch(err => console.log(err))
    }

    const onHandleCancelModalRating = () =>{
        setModal(false)
    }


    const renderList = transaction.map((transactionMap,index) => {
        const readPicture = `http://localhost:2020/transaction/uploadpaymentpicture/${transactionMap.payment_image}`
        const statusTransactionPayment = transactionMap.transaction_status;

        return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{transactionMap.id}</td>
                <td>{transactionMap.total_amount}</td>
                <td style={{width: '5rem', height: '5rem'}}><img src={readPicture} alt={transactionMap.payment_image}/></td>
                <td>{transactionMap.transaction_status}</td>
                <td>    {transactionMap.rating_status ?  
                        <StarRatings
                            rating={transactionMap.rating_transaction}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="1px"
                        />  :
                        <StarRatings
                            rating={0}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="1px"
                        />  
                        }
                </td>
                <td>
                    {statusTransactionPayment ? 
                        <Link to={`uploadtransfer/${transactionMap.id}`}>
                            <button className="btn btn-outline-primary mx-3" disabled> <s><b>Upload Foto Transaksi</b></s> </button>            
                        </Link> :
                        <Link to={`uploadtransfer/${transactionMap.id}`}>
                            <button className="btn btn-outline-primary mx-3">Upload Foto Transaksi</button>            
                        </Link>
                    }
                  
                    
                    {transactionMap.rating_status ? 
                        <button  className="btn btn-outline-primary mx-3 my-3" style={{opacity: 0}}>Give A Rating</button>                         
                        :
                        <button onClick={() => {onHandleOpenModalRating(transactionMap.id)}} className="btn btn-outline-secondary mx-3 my-3">Give A Rating </button> 
                    }
                </td>
            </tr>
        
        )
    })

    return (
        <div className="container">
            <h1 className="text-center">Manage Acc Transaksi</h1>
            <table class="table table-hover table-bordered">
                <thead className="theead-dark">
                    <tr>
                        <th scope="col">NO. </th>
                        <th scope="col">ID TRANSACTION</th>
                        <th scope="col">TOTAL BAYAR</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">RATING</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {renderList}
                </tbody>
            </table>

            <ModalRating 
                propsId = {idTransaction}
                propsBoolModal={modal}
                propsCancel={onHandleCancelModalRating}
                propsSave = {onHandleSaveModalRating}
            />
        </div>
    )
}
