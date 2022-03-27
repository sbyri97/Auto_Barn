import React from "react";
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import '../Home/homePage.css'


export default function AboutMe() {

    return (
        <div className="footer-inner-div">
            <div className="footer-links">
                <a
                    href="https://github.com/sbyri97"
                    target="_blank"
                    rel="noreferrer"
                >
                    <AiFillGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/sai-byri-2230015/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <AiFillLinkedin />
                </a>
            </div>
        </div>
    )
}
