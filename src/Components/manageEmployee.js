import React, {useState, useEffect} from "react"
import {Form,Modal, Button } from 'react-bootstrap'

const ManageEmployee = ({ employee, show, onModalClose, onEmployeeSave }) => {

    const [formState, setFormState] = useState({})

    useEffect(()=>{
      if(employee && Object.keys(employee).length>0) {
        setFormState(employee)
      } else {
        setFormState({ id: "", name: "", manager: "", designation: "", department: "", email: "", phone: ""})
      }
    }, [employee])

    const handleClose = () => {
      onModalClose()
    }

    const handleSave = () => {
      //Save Employee
      //Pass new employee
      onEmployeeSave(formState)
      onModalClose()
    }

    const handleChange = (e) => {  
      const { name, value } = e.target
      setFormState(prevState => ({ ...prevState, [name]: value }))
    }

    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Employee Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="row mb-3" controlId="id">
                  <Form.Label className="col  col-sm-3">Id</Form.Label>
                  <Form.Control className="col" type="text" name="id" placeholder="Id" value={formState.id} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="name">
                  <Form.Label className="col  col-sm-3">Name</Form.Label>
                  <Form.Control className="col" type="text" name="name" placeholder="Name" value={formState.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="row mb-3" controlId="designation">
                  <Form.Label className="col  col-sm-3">Designation</Form.Label>
                  <Form.Control className="col" type="text" name="designation" placeholder="Designation" value={formState.designation} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="department">
                  <Form.Label className="col  col-sm-3">Department</Form.Label>
                  <Form.Control className="col" type="text" name="department" placeholder="Department" value={formState.department} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="manager">
                  <Form.Label className="col  col-sm-3">Manager</Form.Label>
                  <Form.Control className="col" type="text" name="manager" placeholder="Manager" value={formState.manager} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="email">
                  <Form.Label className="col  col-sm-3">Email address</Form.Label>
                  <Form.Control className="col" type="email" name="email" placeholder="Email" value={formState.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="row mb-3" controlId="phone">
                  <Form.Label className="col  col-sm-3">Phone</Form.Label>
                  <Form.Control className="col" type="text" name="phone" placeholder="Phone" value={formState.phone} onChange={handleChange} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
};
export default ManageEmployee;