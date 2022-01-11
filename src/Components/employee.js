
import React from "react"

const Employee = ({ employee, onEmployeeSelected }) => {

    const handleEmployeeSelect = (e) => {
        onEmployeeSelected(employee.id)
    }

    return (
        <tr>
            <td>
                <input type='checkbox' checked={employee.selected?true:false} onChange={handleEmployeeSelect}/>
            </td>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.designation}</td>
            <td>{employee.department}</td>
            <td>{employee.manager}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
        </tr>
    )
};
export default Employee;