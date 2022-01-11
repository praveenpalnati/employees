// books.js

import React, { useEffect } from "react";
import './employees.css'
import Employee from "./employee";
import {Table} from "react-bootstrap"

const Employees = ({ employees, onAllEmployeesSelected, onEmployeeSelected }) => {
  
  const employeesComponent = employees.map((employee, index) => {
    return (
      <Employee key={index} employee={employee} onEmployeeSelected={onEmployeeSelected}/>
    )
  })

  const handleAllEmployeesSelected = (e) => {
    onAllEmployeesSelected(e)
  }

  const allEmployeesSelected = employees.every(emp=> emp.selected===true)?true:false

  return (
    <Table stripped="true" bordered hover size="sm">
      <thead>
        <tr>
          <th scope="col">
            <input type='checkbox' checked={allEmployeesSelected} onChange={handleAllEmployeesSelected}/>
          </th>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Designation</th>
          <th scope="col">Department</th>
          <th scope="col">Manager</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
        {employeesComponent}
      </tbody>
    </Table>
  )
};
export default Employees;