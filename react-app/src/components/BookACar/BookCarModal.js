import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import TryACar from './BookCar';
import './booking.css'



function BookingFormModal({carId}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <div className='booking-main-div'>
        <button className='try-me-btn' onClick={() => setShowModal(true)}>TRY ME</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <TryACar className='Modal' carId={carId}/>
          </Modal>
        )}
      </div>
    );
  }

  export default BookingFormModal;
