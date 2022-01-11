import React, { useEffect, useState } from "react"
import Employees from "./Components/employees"
import Search from "./Components/search"
import ManageEmployee from "./Components/manageEmployee.js"
import {getEmployees, saveEmployee, updateEmployee, deleteEmployee} from "./Services/firebase"
import {Alert} from 'react-bootstrap'

const App = () => {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [modalState, setModalState] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [editEmployee, setEditEmployee] = useState({})
  const [filteredEmployees, setFilteredEmployees] = useState([])

  useEffect(()=>{
    getEmployees(captureEmployees)
  }, [])

  const captureEmployees = (employees) => {
    setEmployees(employees)
  }

  useEffect(()=>{
    const filteredEmployees = employees.filter((employee) => {
      return employee.name.includes(searchTerm);
    })
    setFilteredEmployees(filteredEmployees)
  }, [searchTerm, employees])

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value);
  }

  const handleAddNew = () => {
    setModalState(true)
  }

  const handleModalClose = () => {
    setModalState(false)
    setEditEmployee({})
  }

  const handleEmployeeSelected = (id) => {
    let tempEmployee = filteredEmployees.find((emp)=> {
      return emp.id === id
    })
    tempEmployee.selected = !tempEmployee.selected
    if(tempEmployee.selected) {
      setSelectedEmployees([
        ...selectedEmployees,
        tempEmployee
      ])
    } else if (!tempEmployee.selected) {
      setSelectedEmployees(
        selectedEmployees.filter((selectedEmp)=> {
          return selectedEmp.id !== tempEmployee.id
        })
      )
    }
    setFilteredEmployees(filteredEmployees)
  }

  const handleAllEmployeesSelected = (e) => {
    const tempEmployees = [...filteredEmployees]
    tempEmployees.forEach((emp)=>{
      emp.selected = e.target.checked
    })
    if(e.target.checked) {
      setSelectedEmployees(tempEmployees)
    } else {
      setSelectedEmployees([])
    }
    setFilteredEmployees(tempEmployees)
  }

  const handleEmployeeSave = (employee) => {
    const index = employees.findIndex(emp=>emp.id===employee.id)
    console.log(index)
    if(index === -1) {
      saveEmployee(employee).then(()=>{
      })
    } else {
      updateEmployee(employee).then(()=>{
        setSelectedEmployees([])
        setEditEmployee({})
      })
    }
  }

  const handleEditClick = () => {
    setEditEmployee(selectedEmployees[0])
    setModalState(true)
  }

  const handleDeleteClick = () => {
    let promises = []
    selectedEmployees.forEach((selectedEmp)=> {
      promises.push(deleteEmployee(selectedEmp))
    })
    Promise.all(promises).then(()=>{
      setSelectedEmployees([])
    })
  }

  return (
    <div style={{padding: '5%'}}>
      <Alert show={true} variant="info">Select an employe for edit/delete. Only delete works with multiple selections</Alert>
      <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px'}}>
        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <button onClick={handleAddNew}>Add New</button>
          {selectedEmployees && selectedEmployees.length ===1 && <button style={{marginLeft: "5px"}} onClick={handleEditClick}>Edit</button>}
          {selectedEmployees && selectedEmployees.length>0 && <button style={{marginLeft: "5px"}} onClick={handleDeleteClick}>Delete</button>}
        </div>
        <Search name="search" onSearch={handleInputChange} val={searchTerm} />
      </div>
      <ManageEmployee employee={editEmployee} show={modalState} onModalClose={handleModalClose} onEmployeeSave={handleEmployeeSave}/>
      <Employees employees={filteredEmployees} onAllEmployeesSelected={handleAllEmployeesSelected} onEmployeeSelected={handleEmployeeSelected}/>
    </div>
  );
}
export default App