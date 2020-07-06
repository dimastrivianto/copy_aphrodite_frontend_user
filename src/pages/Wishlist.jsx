import React,{useState, useRef, useEffect} from 'react'
import ItemProduct from '../components/ItemProduct';
import axios from '../config/axios'
import { useSelector } from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function Whislist() {

    const token = useSelector(state => state.auth.token)
    const username = useSelector(state => state.auth.username)
    const [pictureProduct, setPictureProduct] = useState()
    const nameProdukRef = useRef()
    const hargaMaxProdukRef = useRef()
    const hargaMinProdukRef = useRef()
    const kategoriProdukRef = useRef()


    const [whislist, setWhislist] = useState([])

    useEffect(() => {
        getWhislistSelection();
    },[])
  
    const getWhislistSelection = () =>{
       
        let filterResult = [];

        axios.get('/whislist').then((res) =>{

            filterResult = res.data.result.filter((data) => {
                return (
                    data.status_whistlist_product !== 0
                )
            })

            setWhislist(filterResult);
            setPictureProduct(`${res.data.picturelink}?unq=${new Date()}`)
        }).catch(err => console.log({err}))
    }


    const getWhislist = () =>{

        axios.get('/whislist').then((res) =>{

            setWhislist(res.data.result);
            setPictureProduct(`${res.data.picturelink}?unq=${new Date()}`)
        }).catch(err => console.log({err}))
    }

    const renderWhislist = () =>{
            return <ItemProduct propsProduct={whislist} propsPicture={pictureProduct} propsLoveClick={loveClick}/>
    }

    const loveClick = (productId) =>{
        whislist.filter((productWhislist) =>{
            if (productWhislist.product_id === productId) {
          
                const config = { headers: {Authorization : token}}

                let status_whistlist_product;
                // status = 1
                if (productWhislist.status_whistlist_product) {
                    status_whistlist_product = 0
                } else if(!productWhislist.status_whistlist_product){
                    status_whistlist_product = 1
                }
                let body = {status_whistlist_product}
                
                axios.patch(`/whislist/${productWhislist.whislist_id}/${productId}`, body, config).then((res)=>{
                    console.log(`data berhasil diubah`, {res});
                    getWhislist()
                }).catch(err => console.log({err}))
            
            }
        })
    }

    const onBtnSearch = () => {  
        axios.get('/whislist')
        .then((res) =>{
            let nameProdukKeyword = nameProdukRef.current.value
            let hargaMaxProdukKeyword = parseInt( hargaMaxProdukRef.current.value)
            let hargaMinProdukKeyword = parseInt( hargaMinProdukRef.current.value )
            let kategoriProdukKeyword = kategoriProdukRef.current.value
        
        let filterResult = []
        console.log(res.data.result);
        

        if(isNaN(hargaMaxProdukKeyword) && isNaN(hargaMinProdukKeyword)){ // Search by Name
            filterResult = res.data.result.filter((data) => {
                return (
                    data.name.toLowerCase().includes(nameProdukKeyword.toLowerCase())
                )
            })
    
        } else if (isNaN(hargaMaxProdukKeyword)){
            filterResult = res.data.result.filter((data) => { // Search by Minimum and Name
                return (
                    data.name.toLowerCase().includes(nameProdukKeyword.toLowerCase())&&
                    data.price >= hargaMinProdukKeyword
                )
            })
    
        } else if (isNaN(hargaMinProdukKeyword)){
            filterResult = res.data.result.filter((data) => { // Search by Maximum and Name
                return (
                    data.name.toLowerCase().includes(nameProdukKeyword.toLowerCase())&&
                    data.price <= hargaMaxProdukKeyword
                )
            })
    
        }  else if (isNaN(kategoriProdukKeyword)){ // search hanya kategori saja
            console.log("category");
            console.log(kategoriProdukKeyword);

            console.log(nameProdukKeyword);
            
                
            filterResult = res.data.result.filter((data) =>{
                return data.category_name.toLowerCase().includes(kategoriProdukKeyword.toLowerCase()) && data.name.toLowerCase().includes(nameProdukKeyword.toLowerCase())
            })
            console.log(filterResult);
            
        } else {
            filterResult = res.data.result.filter((data) => { // Search by Name, Minimum, and Maximum
                return (
                    data.name.toLowerCase().includes(nameProdukKeyword.toLowerCase()) &&
                    data.price >= hargaMinProdukKeyword &&
                    data.price <= hargaMaxProdukKeyword
                )
            })
        }
        setWhislist(filterResult)
        })
    }

    const onBtnReset = () =>{
        nameProdukRef.current.value = ""
        hargaMaxProdukRef.current.value  = ""
        hargaMinProdukRef.current.value  = ""
        kategoriProdukRef.current.value = ""
        getWhislist(); 
    }

    // bisa tidak merender tampilan tanpa merender browser?

    return username ? (
            <div className="row" >
                <div className="col-3 " style={{height: 400}}>
                    <div className="card shadow " style={{width: '25rem', height: 400}}>
                        <div class="card-body pt-3 pb-3 d-flex justify-content-center">
                            <form>
                                <div className="row ">
                                    <div className="form-group">
                                        <label htmlFor="namaProdukFilterInput">Nama Produk</label>
                                        <input 
                                            ref={nameProdukRef}
                                        type="text" className="form-control" id="namaProdukFilterInput" placeholder="Adenium Ring"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="hargaProdukFilterInput">Harga Produk</label>
                                        <input 
                                            ref={hargaMaxProdukRef}
                                        type="text" className="form-control" id="hargaProdukFilterInput" placeholder="Rp. Max"/>
                                         <br/>
                                        <input 
                                            ref={hargaMinProdukRef}
                                        type="text" className="form-control" id="hargaProdukFilterInput" placeholder="Rp. Min"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="kategoriFilterFormControlSelect">Kategori</label>
                                        <select 
                                           ref={kategoriProdukRef}
                                        className="form-control" id="kategoriFilterFormControlSelect">
                                            <option>Cincin</option>
                                            <option>Gelang</option>
                                            <option>Kalung</option>
                                            <option>Anting</option>
                                            <option>Jam tangan</option>
                                            <option>Penjepit Rambut</option>
                                        </select>
                                    </div>
                                </div>
                               
                            </form>
                         
                        </div>
                        <div className="row" style={{width: 300, marginLeft: 50, marginTop: 100}}>
                            <input type="submit" className="btn btn-outline-primary btn-outline-search" value="Search" onClick={onBtnSearch}/>
                        </div>
                            <div className="row" style={{width: 300, marginLeft: 50}}>
                                <input type="submit" className="btn btn-outline-primary btn-outline-reset" value="Reset" onClick={onBtnReset}/>
                            </div>
                    </div>
                </div>
                <div className="col-8 offset-1" >
                  {renderWhislist()}
                </div>
            </div>
     
    ) : (
        <Redirect to = "/login"/>
    )
}
