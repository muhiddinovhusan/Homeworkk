import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from './Students';
import { GlobalContext } from './stateManagment';

const EditStudent = ({ student }) => {
  const { editModal, closeEditModal } = useContext(ModalContext);
  const { updateStudent } = useContext(GlobalContext);

  const [editedStudent, setEditedStudent] = useState(student);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setEditedStudent((prevStudent) => ({
  //     ...prevStudent,
  //     [name]: value,
  //   }));
  //   console.log(event.target.value)
  // };

  const handleInputChange = (e) => {
    setEditedStudent({
      ...editedStudent,
      [e.target.id]: e.target.value
    })
  }


  const handleUpdate = (e) => {
    e.preventDefault();
    updateStudent(editedStudent)
    closeEditModal();
  };

  return (
    <div>
      <Modal show={editModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>
                firstName
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                value={editedStudent.firstName}
                onChange={handleInputChange}

              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>
                lastName
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                value={editedStudent.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <select
                name='group'
                id='group'
                className='form-select w-auto'
                value={editedStudent.group}
                onChange={handleInputChange}
              >
                <option value='All'>Select</option>
                <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
              </select>
            </div>
            <div className='mb-3 form-check'>
              <label htmlFor='number' className='form-label'>
                number
              </label>
              <input
                type='number'
                className='form-control'
                id='number'
                value={editedStudent.number}
                onChange={handleInputChange}
              />
            </div>
            <Button type='submit' variant='primary'>
              Edit
            </Button>
            <Button variant='secondary' onClick={closeEditModal}>
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditStudent;