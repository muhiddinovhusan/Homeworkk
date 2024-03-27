
import { createContext, useContext, useEffect, useReducer, useState, } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { GlobalContext, GlobalProvider } from './stateManagment';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';


const initialState={
  addModal: false,
  editModal: false,
}
export const ModalContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
  
 
    case "OPEN_MODAL":
      return {
        ...state,
        addModal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        addModal: false,
      };
      case "EDIT_MODAL":
      return {
        ...state,
        editModal: true,

      }
      case "CLOSE_EDIT_MODAL":
          return {
            ...state,
             editModal: false,
      };
   
    default:
      return state;
  }
};

const Students = () => {
 

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    students,
    getStudents,
    deleteStudent,
   

  } = useContext(GlobalContext);

  useEffect(() => {
    getStudents();
  }, []);




  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const openEditModal = () => {
    dispatch({ type: "EDIT_MODAL" });
  };

  const closeEditModal = () => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });
  };
  return (



      <div>
        <div className='container py-3'>
          <div>
            <ButtonGroup className='w-100'>
              <input type="text" placeholder='Search' className='form-control p-2' />
              <select name="filter" id="filter" className='form-select w-auto'>
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button className='btn btn-outline-success w-auto' onClick={openModal}>Add</button>
            </ButtonGroup>
          </div>
        </div>
        <div>

          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Gender</th>
                  <th>Number</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={student.id}>
                    <td>{i + 1}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.gender}</td>
                    <td>{student.number}</td>
                    <td className='d-flex gap-2'>
                      <button className='btn btn-warning btn-sm' onClick={openEditModal}>Edit</button>
                      <button className='btn btn-danger btn-sm' onClick={() => deleteStudent(student.id)}>Delete</button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
   <ModalContext.Provider  value={{ addModal:state.addModal, openModal,closeModal,
editModal : state.editModal, closeEditModal, openEditModal
  
  }}>
<EditStudent/>
          <AddStudent  />
   </ModalContext.Provider>
      
      </div>

  );
};

export default Students;