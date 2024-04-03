
import { createContext, useContext, useEffect, useReducer, useState, } from 'react';
import { ButtonGroup, PageItem } from 'react-bootstrap';

import { GlobalContext2 } from './teachStateManagment';
import EditTeachers from './EditTeachers';
import AddTeachers from './AddTeachers';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';


const initialState = {
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

const Teachers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    teachers,
    getTeachers, deleteTeachers
   } = useContext(GlobalContext2);

  useEffect(() => {
    getTeachers();
  }, []);

  const [filtered, setFiltered] = useState(teachers);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4)



  /////pagination//////
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currenPosts = filtered.slice(firstPostIndex, lastPostIndex);

  let pages = [];
  const totalPosts = teachers.length
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pages.push(i)
  }
   const tot = Math.ceil(totalPosts / postsPerPage)

  const hasPrev = Boolean(currentPage > 1)
  const hasPrev2 = Boolean(currentPage <tot)

  const handleChange = (type) => {
    if (type === "prev") {
        setCurrentPage(currentPage - 1)
    } else {
        setCurrentPage(currentPage + 1)
    }
}



////search

  const handleProductSearch = (e) => {
    const text = e.target.value.trim().toLowerCase();
    setFiltered(
      teachers.filter(
        (product) =>
          product.lastName.toLowerCase().includes(text) ||
          product.firstName.toLowerCase().includes(text)
      )
    );
  };




////////filter//////
  const handleFilter = (e) => {
    setFilter(e.target.value);
    const filter = e.target.value;
    if (filter === "All") {
      setFiltered(teachers);
    } else {
      setFiltered(
        teachers.filter((product) => product.level === filter)
      );
    }
  };


  useEffect(() => {
    setFiltered(teachers);
  }, [teachers]);




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

  }



  const [selectedTeachers, setSelectedTeachers] = useState(null);

  // ...

  const handleEdit = (teacher) => {
    setSelectedTeachers(teacher);
    console.log(setSelectedTeachers)
    openEditModal();

  }
  
  return (



    <div>
      <div className='container py-3'>
        <div>
          <ButtonGroup className='w-100'>
            {/* <input type="text"
            placeholder='Search'
            className='form-control p-2'
            onChange={handleProductSearch}
            /> */}
            <TextField size='medium' label="search" fullWidth onChange={handleProductSearch}/>
            {/* <select  name="filter" 
            id="filter"
           className='form-select w-auto'
            onChange={handleFilter}
        
            >
              <option value="All">All</option>
              <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
            </select> */}
            <Box width={250}>
              <TextField label='Select' select fullWidth    id="filter"
              onChange={handleFilter} >

              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Junior'>Junior</MenuItem>
              <MenuItem value='Middle'>Middle</MenuItem>
              <MenuItem value='Senior'>Senior</MenuItem>
              </TextField>
            </Box>
            <button className='btn btn-outline-success w-auto' onClick={openModal}>Add</button>
          </ButtonGroup>
        </div>
      </div>
      <div>

        <div className='container' >
          <table className='table' >
            <thead>
              <tr>
                <th>#</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Groups</th>
                <th>Level</th>
                <th>Actions</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currenPosts.map((student, i) => (
                <tr key={student.id}>
                  <td>{i + 1}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.groups}</td>
                
                  <td>{student.level}</td>
                  <td className='d-flex gap-2'>
                    <Button variant='contained' startIcon={<Edit/>} onClick={()=>handleEdit(student)} size='medium'>Edit</Button>
                    <Button variant='contained'  color='error' startIcon={<Delete/>} onClick={() => deleteTeachers(student.id)}  size='medium'>Delete</Button>
                  </td>
                 <td></td>
                 <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalContext.Provider value={{
        addModal: state.addModal, openModal, closeModal,
        editModal: state.editModal, closeEditModal, openEditModal

      }}>

        <AddTeachers/>
        {state.editModal && <EditTeachers student={selectedTeachers} />}

      </ModalContext.Provider>

      <div className="pagination container">
                <PageItem className="prev" disabled={!hasPrev} onClick={() => handleChange("prev")}>prev</PageItem>

                {pages.map((page) => (
                  <PageItem key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                    {page}
                  </PageItem>
                ))}



                <PageItem disabled={!hasPrev2} className="next " onClick={() => handleChange("next")}>next</PageItem>
            </div>
     
    </div>

  );
};

export default Teachers;