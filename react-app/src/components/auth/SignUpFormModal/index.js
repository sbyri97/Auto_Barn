import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import SignUpForm from '../SignUpForm';
import "./signupform.css"


function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <div className='loginDiv'>
        <button className='loginButton' onClick={() => setShowModal(true)}>SIGN UP</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignUpForm className='Modal'/>
          </Modal>
        )}
      </div>
    );
  }

  export default SignUpFormModal;
