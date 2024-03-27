import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalContext } from './Students';
import { GlobalContext } from './stateManagment';

const AddStudent = () => {
  const { addModal, closeModal } = useContext(ModalContext);
const {addStudent}=useContext(GlobalContext)
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
    number: "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
addStudent(student);
console.log(student)
alert('he;o')
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
            <input type="text"
            
              className='form-control'
              id='firstName'
value={student.firstName}
onChange={e => setStudent({ ...student, firstName: e.target.value })}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>lastName</label>
            <input type="text" className='form-control' id='lastName'
            value={student.lastName}
            onChange={e => setStudent({ ...student, lastName: e.target.value })}/>

          </div>
          <div className='mb-3'>

            <select name="gender" id="gender" className='form-select w-auto'
            onChange={e => setStudent({ ...student, gender: e.target.value })} >
              <option value="All">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>

            </select>
          </div>
          <div className='mb-3 form-check'>
            <label htmlFor="number" className='form-label'>number</label>
            <input type="number" className='form-control' id='number' 
            value={student.number}
            onChange={e => setStudent({ ...student, number: e.target.value })}
            />
          </div>
        </form>
          <Button type="submit" variant="primary" onClick={closeModal}>
        Add
       
        </Button>
        <Button   variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Body>
     
      
     
    </Modal></div>
  )
}

export default AddStudent