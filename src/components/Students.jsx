
import { createContext, useContext, useEffect, useReducer, useState, } from 'react';
import { ButtonGroup, PageItem } from 'react-bootstrap';
import { GlobalContext, GlobalProvider } from './stateManagment';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import StyledCompBtn from './StyledCompBtn';


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

const Students = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    students,
    getStudents,
    deleteStudent, } = useContext(GlobalContext);

  useEffect(() => {
    getStudents();
  }, []);

  const [filtered, setFiltered] = useState(students);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5)



  /////pagination//////
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currenPosts = filtered.slice(firstPostIndex, lastPostIndex);

  let pages = [];
  const totalPosts = students.length
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
      students.filter(
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
      setFiltered(students);
    } else {
      setFiltered(
        students.filter((product) => product.group === filter)
      );
    }
  };


  useEffect(() => {
    setFiltered(students);
  }, [students]);




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



  const [selectedStudent, setSelectedStudent] = useState(null);

  // ...

  const handleEdit = (student) => {
    setSelectedStudent(student);
    console.log(setSelectedStudent)
    openEditModal();
  }
  
  return (



    <div>
      <div className='container py-3'>
        <div>
          <ButtonGroup className='w-100'>
            <input type="text"
            placeholder='Search'
            className='form-control p-2'
            onChange={handleProductSearch}
            />
            <select  name="filter" 
            id="filter"
           className='form-select w-auto'
            onChange={handleFilter}
        
            >
              <option value="All">All</option>
              <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
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
                <th>Group</th>
                <th>Number</th>
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
                  <td>{student.group}</td>
                
                  <td>{student.number}</td>
                  <td className='d-flex gap-2'>
                    <StyledCompBtn  onClick={()=>handleEdit(student)}>Edit</StyledCompBtn>
                    <StyledCompBtn variant="outline"  onClick={() => deleteStudent(student.id)}>Delete</StyledCompBtn>
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

        <AddStudent />
        {state.editModal && <EditStudent student={selectedStudent} />}

      </ModalContext.Provider>

      <div className="pagination">
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

export default Students;