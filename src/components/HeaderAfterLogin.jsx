import React, {useRef}from 'react'

import { useDispatch } from 'react-redux'
import {navbarSearchAction} from '../config/redux/actions'

import IconAphrodite from './IconAphroditeText'
import { GoSearch } from 'react-icons/go';


import {
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "reactstrap";

  import { Link } from "react-router-dom";

export default function HeaderAfterLogin() {

  const dispatch = useDispatch()
  const inputRef = useRef()

  const onSubmitForm = (e) => {
    e.preventDefault()

    const keyword = inputRef.current.value 
    dispatch(navbarSearchAction({keyword}))
  }


    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <a className="navbar-brand" href="/"><IconAphrodite/></a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <div className="mx-auto" style={{width: '95%'}}>
                    <div className="row col-12 pl-2" >
                        <form onSubmit={onSubmitForm} className="form-inline my-1 col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup">Pencarian</label>
                                <div className="input-group col-12">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><GoSearch/></div>
                                    </div>
                                    <input ref = {inputRef} type="input" className="form-control" id="inlineFormInputGroup" placeholder="Mau beli apa hari ini ?" />
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

              <UncontrolledDropdown nav inNavbar className="titikhitam">
                <DropdownToggle nav caret>
                 Hello,
                  {/*  */}
                </DropdownToggle>
                <DropdownMenu right>
                <NavLink tag={Link} to="/profile">
                    <DropdownItem>Profile</DropdownItem>
                  </NavLink>
                
                  <NavLink tag={Link} to="/discount">
                    <DropdownItem>Diskon</DropdownItem>
                  </NavLink>
                  <NavLink tag={Link} to="/paket">
                    <DropdownItem>Package</DropdownItem>
                  </NavLink>
                  <NavLink tag={Link} to="/cart">
                    <DropdownItem>Cart</DropdownItem>
                  </NavLink>
                  <NavLink tag={Link} to="/wishlist">
                    <DropdownItem>Whislist</DropdownItem>
                  </NavLink>
                  <NavLink tag={Link} to="/transaction">
                    <DropdownItem>Transaction</DropdownItem>
                  </NavLink>
                  <DropdownItem divider />
                  <DropdownItem >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
        </nav>

    )
}
