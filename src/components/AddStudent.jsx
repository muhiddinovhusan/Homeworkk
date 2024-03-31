import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalContext } from './Students';
import { GlobalContext } from './stateManagment';

const AddStudent = () => {
  const { addModal, closeModal } = useContext(ModalContext);
  const { addStudent } = useContext(GlobalContext)
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
    number: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [id]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    addStudent(student);
    console.log(student)
    closeModal();
  
  };


  return (


    <div>   <Modal show={addModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title> Add student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} >
          <div className='mb-3'>
            <label htmlFor="firstName" className='form-label'>firstName</label>
            <input required type="text"

              className='form-control'
              id='firstName'
              value={student.firstName}
              onChange={handleInputChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>lastName</label>
            <input required type="text" className='form-control' id='lastName'
              value={student.lastName}
              onChange={handleInputChange} />

          </div>
          <div className='mb-3'>

            <select name="group" id="group" className='form-select w-auto'
              required
              value={student.group}
              onChange={handleInputChange}

            >
              <option value="">Select</option>
              <option value='React N35'>React N35</option>
              <option value='React N40'>React N40</option>
              <option value='React N45'>React N45</option>

            </select>
          </div>
          <div className='mb-3 form-check'>
            <label htmlFor="number" className='form-label'>number</label>
            <input required type="number" className='form-control' id='number'
              value={student.number}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" variant="primary">
            Add

          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </Modal.Body>



    </Modal></div>
  )
}

export default AddStudent