import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import Select from 'react-select';
import "../../App.scss";

const useStyles = makeStyles(() => ({
  label: {
    width: 170,
    fontWeight: 700,
    fontStyle: 'italic'
  },
  flexForm: {
    display: 'flex',
    marginBottom: 10
  },
  w30: {
    width: '30%'
  },
  titleTabel: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 500
  }
}))

function MaintainSymptomp({ open, onClose }) {
  const classes = useStyles()
  const [nos, setNos] = useState(null)
  const [cos, setCos] = useState(null)
  const [vdf, setVdf] = useState("")
  const [vdt, setVdt] = useState("")

  const optCos = [
    { value: '1', label: 'Plastik' },
    { value: '2', label: 'Logam' },
    { value: '3', label: 'Cairan' },
    { value: '4', label: 'Electrical' },
]

  const handleChange = (e, name) => {
    if (name === 'nos') { setNos(e.target.value) }
    else if (name === 'cos') { setCos(e)}
    else if (name === 'vdf') { setVdf(e.target.value)}
    else if (name === 'vdt') { setVdt(e.target.value)}
  }

  const handleClose = () => {
    setNos(null)
    setCos(null)
    setVdf("")
    setVdt("")
    onClose()
  }

  return (
    <Modal show={open} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title><div className='div-icon modal-icon'><i className="typcn typcn-plus"></i></div> Main Symptomp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-sm">
          <div className="col-lg-12 mg-t-15">
            <div className={classes.flexForm}>
              <span className={classes.label}>Name Of Symptomp<span style={{ color: 'red' }}>*</span></span>
              <div style={{ width: '50%' }}>
                <Form.Control type="text" name='nos' value={nos} onChange={(e) => handleChange(e, 'nos')} />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Category Of Symptomp<span style={{ color: 'red' }}>*</span></span>
              <div style={{ width: '50%' }}>
                <Select name="cos" value={cos} options={optCos} onChange={(e) => handleChange(e, 'cos')} isClearable />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Valid Date From<span style={{ color: 'red' }}>*</span></span>
              <div style={{ width: '50%' }}>
                <Form.Control type="date" name='vdf' value={vdf} onChange={(e) => handleChange(e, 'vdf')} />
              </div>
            </div>
            <div className={classes.flexForm}>
              <span className={classes.label}>Valid Date To<span style={{ color: 'red' }}>*</span></span>
              <div style={{ width: '50%' }}>
                <Form.Control type="date" name='vdt' value={vdt} onChange={(e) => handleChange(e, 'vdt')} />
              </div>
            </div>
          </div>
          <div className="row row-sm w-100 mt-3" style={{ padding: '0 0 0 20px' }}>
            <div className="col-lg-6">
              <Button variant="success btn-block" onClick={handleClose}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Save</Button>
            </div>
            <div className="col-lg-6">
              <Button variant="danger btn-block" onClick={handleClose}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Back</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MaintainSymptomp;