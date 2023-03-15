import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createCompany } from '../managers/CompanyManager';

export const CreateCompanyModal =(props)=> {
  const [show, setShow] = useState(false);
  const [jobsList, setJobsList] = useState([])
  const [companyName, setCompanyName] = useState({
    name:""
  })
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setCompanyName(e.target.value)
    props.companyName = e.target.value;

    
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Company
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Example"
                autoFocus
                onChange={handleChange}
                
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}