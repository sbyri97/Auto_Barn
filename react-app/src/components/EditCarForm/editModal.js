import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import EditCarForm from './EditCarForm';
// import "./LoginForm.css"


function EditCarFormModal({oldCar, carId}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <div className='loginDiv'>
        <button className='ednButton' onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditCarForm oldCar={oldCar} carId={carId} showModal={showModal} setShowModal={setShowModal} className='Modal'/>
          </Modal>
        )}
      </div>
    );
  }

  export default EditCarFormModal;
