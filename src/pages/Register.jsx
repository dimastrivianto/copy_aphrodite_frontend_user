import React,{useState, useRef} from 'react'
import { Link } from "react-router-dom";

import RegisterImg from '../assets/images/register.svg'
import axios from '../config/axios';


export default function Register() {
    console.log("Register Page");

    const [regBerhasil, setRegBerhasil] = useState("")

    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [alamat, setAlamat] = useState();

    const [cekEmail, setCekEmail] = useState("");
    const [cekPhone, setCekPhone] = useState("");

    const usernameRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const genderRef = useRef()
    const phoneRef = useRef()
    const alamatRef = useRef()

    const onSubmitForm = (e) => {
        e.preventDefault()

        let vUsernameRef = usernameRef.current.value
        let vNameRef = nameRef.current.value
        let vEmailRef = emailRef.current.value
        let vPasswordRef= passwordRef.current.value

        let vGenderRef;
        
        if (genderRef.current.value === 'Female') {
            vGenderRef = 'F'
        } else if (genderRef.current.value === 'Man') {
            vGenderRef = 'M'
        }

        let vPhoneRef= phoneRef.current.value
        let vAlamatRef = alamatRef.current.value

        let status_verified_email = 0
        let avatar = "nothing.png"

        setUsername(vUsernameRef);
        setName(vNameRef);
        setEmail(vEmailRef);
        setPassword(vPasswordRef);
        setGender(vGenderRef);
        setPhone(vPhoneRef);
        setAlamat(vAlamatRef);  

        cekRegexEmail()
        cekRegexPhone()

        let data = {username: vUsernameRef, password: vPasswordRef, phone_number : vPhoneRef, gender: vGenderRef, email: vEmailRef, main_address: vAlamatRef,  name: vNameRef, status_verified_email, avatar}
        runAxios(data) 

        if (regBerhasil) {
            alert("selamat datang anda berhasil register")
        }
    }

    const cekRegexEmail = () =>{
        // regex
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if(!re.test(emailRef.current.value)){  
            setCekEmail("invalid");
        } else{
            setEmail(emailRef.current.value);
            setCekEmail("")       
        }
    }

    const cekRegexPhone = () => {
        var re = /^[0-9]{13}$/
        if(!re.test(phoneRef.current.value)){  
            setCekPhone("invalid");
            console.log("invalidvalid");
        } else{
            setCekPhone(phoneRef.current.value);
            setCekPhone("")
        }
    }

    const runAxios = (data) => {
        if (cekEmail !== "invalid" && cekPhone !== "invalid") {
            axios.post('/register', data).then((res) => {
              alert("resgiter berhasil, silahkan login")
            })
            
        } else{
            alert(cekEmail + " --Salah")
        }
    }
    
    console.log('username -- ' + username);
    console.log('name -- ' + name);
    console.log('email -- ' + email);
    console.log('cekemail -- ' + cekEmail);
    console.log('password -- ' + password);
    console.log('gender -- ' + gender);
    console.log('phone -- ' + phone);
    console.log('cekPhone -- ' + cekPhone);
    console.log('alamat -- ' + alamat);

    return (
       <div className="container" style={{height: 2000, marginTop: 100}}>
           <div className="row shadow" style={{height: 700}}>
               <div className="col-5 border-right-0 rounded-left d-flex" style={{background:'#FFE3F1',border: '1px solid #FFE3F1' }}>
                    <img src={RegisterImg} alt="Gambar Register" className="img-fluid align-items-center"/>
               </div>
               <div className="col-7 border-left-0 rounded-right" style={{border: '1px solid #FFE3F1'}}>
                   <div className="container">
                        <div className="text-right font-weight-lighter mt-3" style={{fontSize: 14, marginRight: 55}}>
                            <p>Already have an account? 
                                <Link to={`/login`}>
                                    <span style={{color: '#EC4B8A' }}>Log in</span>.
                                </Link>
                            </p>
                        </div>
                       <div>
                            <h5 className="mt-5">Welcome to Aphrodite</h5>
                            <p className="font-weight-lighter">
                                Let's get you all set up so you can verify your nonprofit and <br/>
                                begin setting your first compaign!
                            </p>
                       </div>

                        <form onSubmit={onSubmitForm} >
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="usernameInput">Username</label>
                                        <input 
                                            ref={usernameRef}
                                        type="text" className="form-control" id="usernameInput" placeholder="Adesifia" required/>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="nameInput">Name</label>
                                        <input 
                                            ref={nameRef}
                                        type="text" className="form-control" id="nameInput" placeholder="Ade" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row ml-1">
                                <div className="col-5">
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="emailInput">Email</label>

                                        {cekEmail !== "invalid" ? 
                                        <NormalInput 
                                                pHtmlFor="emailInput" pRef={emailRef} 
                                                pValue={email} pType="text" pOnChange={setEmail} pPlaceholder="ade@beauty.iok"/> 
                                        : <InvalidInput 
                                                pHtmlFor="emailInput" pRef={emailRef} 
                                                pValue={email} pType="text" pOnChange={setEmail} pMessage="Kamu memasukkan invalid email format"/>}
                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="passwordInput">Password</label>
                                        <input 
                                           ref={passwordRef}
                                        type="password" className="form-control" id="passwordInput" placeholder="******" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="genderFormControlSelect">Gender</label>
                                        <select 
                                           ref={genderRef}
                                            className="form-control" id="genderFormControlSelect">
                                            <option>Female</option>
                                            <option>Man</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="phoneInput">Phone</label>
                                         {cekPhone !== "invalid" ? 
                                         <NormalInput 
                                                pHtmlFor="phoneInput" pRef={phoneRef}
                                                pValue={phone} pType="text" pOnChange={setPhone} pPlaceholder="6281281147117"/> 
                                         : <InvalidInput 
                                                pHtmlFor="phoneInput" pRef={phoneRef} 
                                                pValue={phone} pType="text" 
                                                pOnChange={setPhone} pMessage="Kamu memasukkan invalid phone format"/>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11">
                                    <div className="form-group">
                                        <label htmlFor="alamatFormControlTextarea">Alamat</label>
                                        <textarea 
                                            ref={alamatRef}
                                        className="form-control" id="alamatFormControlTextarea" rows="3" placeholder="Jalan, Pahlawan Kejar Diskonan" required></textarea>
                                    </div>
                                </div>
                            </div>
                        <input type="submit" className="btn" style={{backgroundColor: '#EC4B8A', color: 'white', width:100}} value="Sign Up"/>
                        </form>
                   </div>
               </div>
           </div>
       </div>
    )
}


function NormalInput(props) {
     console.log('normal --- ' );
    return (
        <div> 
            <input
                ref={props.pRef}
                value={props.pValue}
                onChange={(e) => props.pOnChange(e.target.value)}
                type={props.pType} className="form-control" id={props.pHtmlFor} placeholder={props.pPlaceholder}/>
        </div>
    )
}

function InvalidInput(props) {
    console.log('InvalidEmail --- ' );
    return (
        <div>
            <input
                ref={props.pRef}
                value={props.pValue}
                onChange={(e) => props.pOnChange(e.target.value)}
                type={props.pType} className="form-control is-invalid" id={props.pHtmlFor} placeholder={props.pPlaceholder} />

            <div class="invalid-feedback">
                {props.pMessage}
            </div>
        </div>
    )
}





