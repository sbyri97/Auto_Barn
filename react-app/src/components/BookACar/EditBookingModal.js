import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditTryACar from './EditBooking';
import './booking.css'
import { useHistory } from 'react-router-dom';



function EditBookingFormModal({carId}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <div className='booking-main-div'>
        <button className='try-me-btn' onClick={() => setShowModal(true)}>Edit Booking</button>
        {showModal && (
          <Modal onClose={() => {
            setShowModal(false)
            }}>
            <EditTryACar className='Modal' carId={carId} setShowModal={setShowModal}/>
          </Modal>
        )}
      </div>
    );
  }

  export default EditBookingFormModal;
