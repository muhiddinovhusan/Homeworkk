import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalContext } from './Students';

const EditStudent = () => {
    const { editModal, closeEditModal } = useContext(ModalContext);

  return (
    <div>   <Modal show={editModal} onHide={closeEditModal}>
    <Modal.Header closeButton>
      <Modal.Title> Edit Student</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form  >
        <div className='mb-3'>
          <label htmlFor="firstName" className='form-label'>firstName</label>
          <input type="text"
            className='form-control'
            id='firstName'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="lastName" className='form-label'>lastName</label>
          <input type="text" className='form-control' id='lastName'
        />

        </div>
        <div className='mb-3'>

          <select name="gender" id="gender" className='form-select w-auto' >
            <option value="All">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
        </div>
        <div className='mb-3 form-check'>
          <label htmlFor="number" className='form-label'>number</label>
          <input type="number" className='form-control' id='number' 
        
        
          />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={closeEditModal}>
  Edit 
      </Button>
      <Button  type='submit' variant="secondary" onClick={closeEditModal}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default EditStudent