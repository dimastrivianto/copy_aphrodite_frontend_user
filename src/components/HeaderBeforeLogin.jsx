import React, {useState, useRef} from 'react'
import { Link } from "react-router-dom";

import IconAphrodite from './IconAphroditeText'
import { GoSearch } from 'react-icons/go';

import { useDispatch } from 'react-redux'
import {navbarSearchAction} from '../config/redux/actions'

export default function HeaderBeforeLogin() {

    const dispatch = useDispatch()
    const inputRef = useRef()

    const onSubmitForm = (e) => {
        e.preventDefault()
        const keyword = inputRef.current.value 
        dispatch(navbarSearchAction({keyword}))
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"><IconAphrodite/></a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <div className="mx-auto" style={{width: '95%'}}>
                    <div className="row col-12 pl-2" >
                        <form className="form-inline my-1 col-12" onSubmit={onSubmitForm}>
                            <label className="sr-only" for="inlineFormInputGroup">Username</label>
                                <div className="input-group col-12">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><GoSearch/></div>
                                    </div>
                                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Username" 
                                    ref = {inputRef} />
                                </div>
                        </form>
                    </div>
                    <div className="row" >
                        <ul className="navbar-nav text-uppercase">
                            <li className="nav-item">
                              <Link to={`/categorynavbarkeyword/cincin`}>
                                <a className="nav-link" href="//">Cincin</a>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to={`/categorynavbarkeyword/gelang`}>
                                <a className="nav-link" href="//">Gelang</a>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to={`/categorynavbarkeyword/kalung`}>
                                <a className="nav-link" href="//">Kalung</a>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to={`/categorynavbarkeyword/anting`}>
                                <a className="nav-link" href="//">Anting</a>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to={`/categorynavbarkeyword/bros`}>
                                <a className="nav-link" href="//">Bros</a>
                              </Link>
                            </li>
                        </ul>
                    </div>
                </div>       
            </div>
                <div className="row col-3 justify-content-center">
                    <Link to={`/login`}>
                        <button type="button" class="btn btn-outline-navbar-login">Log In</button>
                    </Link>
                    <Link to={`/register`}>
                        <button type="button" class="btn btn-outline-primary btn-outline-navbar-signup ">Sign Up</button>
                    </Link>
                </div>
          </nav>
    )
}
