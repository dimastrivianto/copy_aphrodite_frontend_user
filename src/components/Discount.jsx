import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../config/axios/'
import { Card } from 'react-bootstrap';


export default function Discount() {

    const [discounts, setDiscounts] = useState([])
    const [userdiscount, setUserdiscount] = useState('')
    const token = useSelector(state => state.auth.token)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        const config = { headers: {Authorization : token}}

        axios.get(`/user/discount`, config)
        .then(res => {
            setUserdiscount(res.data.discount_id);
            axios.get('/user/discounts', config)
            .then(res => setDiscounts(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        
    }, [])

    const getUserDiscount = () => {
        const config = { headers: {Authorization: token}}

        axios.get('/user/discount', config)
        .then(res => {
            setUserdiscount(res.data.discount_id);
            setCheck(!check)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const config = {headers: {Authorization : token}}
        axios.get('/user/discounts', config)
        .then(res => setDiscounts(res.data))
        .catch(err => console.log(err))
    }, [check])

    const addDiscount = (count, id, numbers) => {
        const config = { headers: {Authorization : token}}
        const body = {
            discount_id: id,
            count : count-1,
            numbers
        }
        console.log({numbers: body.numbers})
        axios.post(`/user/discount/`, body, config)
        .then(res => {
            getUserDiscount()
        })
        .catch(err => console.log({err}))
    }

    const cancelDiscount = (count, id) => {
        const config = { 
            headers: {Authorization : token},
            data : {
                count : count+1,
                id
            }
        }
        
        // console.log( {count: data.count, id})
        axios.delete(`/user/discounts`, config)
        .then(res => {
            getUserDiscount()
        })
        .catch(err => console.log(err))
    }

    const discountCard = () => {
        return discounts.map(({id, promo_code, promo_name, count, description, numbers}) => {
            if(userdiscount == id){
                return(
                    <Card style={{ width: '18rem', marginTop : '3rem' }} key={id} >
                        <Card.Body>
                            <Card.Title>{promo_code}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{promo_name}</Card.Subtitle>
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Card.Text>
                                Remaining discounts : {count}
                            </Card.Text>
                            <input  className="btn btn-outline-secondary btn-block"  type="button" value="Cancel discount" onClick={() => {cancelDiscount(count, id)}} />
                        </Card.Body>
                    </Card>
                )
            }
            else if(count == 0 || userdiscount){
                return(
                    <Card style={{ width: '18rem', marginTop : '3rem' }} key={id} >
                        <Card.Body>
                            <Card.Title>{promo_code}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{promo_name}</Card.Subtitle>
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Card.Text>
                                Remaining discounts : {count}
                            </Card.Text>
                            <input  className="btn btn-outline-secondary btn-block"  type="button" value="Add discount" disabled/>
                        </Card.Body>
                    </Card>
                )
            }
            
            else if(userdiscount == [] || userdiscount == undefined){
                return(
                    <Card style={{ width: '18rem', marginTop : '3rem' }} key={id} >
                        <Card.Body>
                            <Card.Title>{promo_code}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{promo_name}</Card.Subtitle>
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Card.Text>
                                Remaining discounts : {count}
                            </Card.Text>
                            <input  className="btn btn-outline-primary btn-block"  type="button" value="Add discount" onClick={() => {addDiscount(count, id, numbers)}} />
                        </Card.Body>
                    </Card>
                )
            }
            
        })
    }

    return (
        <div className="container">
            {discountCard()}
        </div>
    )
}
