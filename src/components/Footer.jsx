import React from 'react'
import { Link } from "react-router-dom";
import IconAphroditeText from './IconAphroditeText';

// FONT
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';


export default function Footer() {
    return (
      <footer style={{marginBottom: 30}}>
              <div className="row px-2">
                  <div className="col-auto" style={{width: 400}}>
                        <IconAphroditeText/>
                        <p>
                        Shop accessories for women at Urban Outfitters today.
                        We have all the accessory trends and styles you're looking for in jewelry, bags, scarves and more.</p>
                  </div>
                  <div className="col-2 ml-4">
                        <h5 >Navigation</h5>
                        <ul className="list-group list-group-flush">
                            <li className="footer-link list-group-item " >
                                <Link to={`/`}>
                                   <button className="button-no-style">Home</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item" >
                                <Link to={`/accessories`}>
                                   <button className="button-no-style">Accessories</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item">
                                <Link to={`/wedding`}>
                                   <button className="button-no-style">Wedding</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item">
                                <Link to={`/about`}>
                                   <button className="button-no-style">About</button>
                                </Link>
                            </li>
                        </ul>
                  </div>
                  <div className="col-2">
                        <h5 >Explore Us</h5>
                        <ul className="list-group list-group-flush">
                            <li className="footer-link list-group-item " >
                                <Link to={`/careers`}>
                                   <button className="button-no-style">Our Careers</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item " >
                                <Link to={`/terms`}>
                                   <button className="button-no-style">Terms & Conditions</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item" >
                                <Link to={`/privacy`}>
                                   <button className="button-no-style">Privacy Policy</button>
                                </Link>
                            </li>
                        </ul>
                  </div>
                  <div className="col-auto ml-3">
                        <h5 >Contact Us</h5>
                        <ul className="list-group list-group-flush">
                            <li className="footer-link list-group-item " >
                                <Link to={`/phone`}>
                                   <button className="button-no-style">0812 - 8990 - 1234</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item " >
                                <Link to={`/email`}>
                                   <button className="button-no-style">support@aphrodite.com</button>
                                </Link>
                            </li>
                            <li className="footer-link list-group-item" >
                                <Link to={`/location`}>
                                   <button className="button-no-style">Aphrodite, Summarecon, Bekasi</button>
                                </Link>
                            </li>
                        </ul>
                  </div>
              </div>
              <div className="row mt-3">
                    <div className="col-6">
                        Copyright @2020 by <b style={{color: '#EC4B8A', fontFamily: 'Bree Serif'}}>Aphrodite</b> All right reserved
                    </div>
                    <div className="col-6">
                        <div className="row d-flex justify-content-end mr-2">
                            <div className="col-auto">
                                <Link to={`/`} style={{color: '#EC4B8A'}}>   
                                    <FaFacebook/>
                                </Link>
                            </div>
                            <div className="col-auto">
                                <Link to={`/`} style={{color: '#EC4B8A'}}>    
                                    <FaTwitter/>
                                </Link>
                            </div>
                            <div className="col-auto">
                                <Link to={`/`} style={{color: '#EC4B8A'}}>      
                                    <FaInstagram/>
                                </Link>
                            </div>
                            <div className="col-auto">
                                <Link to={`/`} style={{color: '#EC4B8A'}}>       
                                    <FaLinkedin/>
                                </Link>
                            </div>
                        </div>
                    </div>
              </div>
      </footer>
    )
}
