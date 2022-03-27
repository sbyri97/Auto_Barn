import React, { useEffect, useState } from "react";
import './NotFound.css';
import notfound from '../../images/notfound.png'
// import {IoCarSportSharp} from 'react-icons/io5'
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const PageNotFound = () => {

    const history = useHistory()
  return (
    <div className="not-found-main-container">
        <div className="not-found-inner-divr">
            {/* <IoCarSportSharp /> */}
            <button className="back-home"
            onClick={() => {
                history.push('/allcars')
            }}
            >Return to Cars</button>
            <img src={notfound} alt='not found' className="not-found-img"/>
        </div>
    </div>
  )
}

export default PageNotFound;
