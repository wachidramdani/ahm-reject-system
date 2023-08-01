import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Modal, Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import slide1 from "../../../assets/images/sample/img1.jpg";
import slide2 from "../../../assets/images/sample/img2.jpg";
import slide3 from "../../../assets/images/sample/img3.jpg";

const useStyles = makeStyles(() => ({
    label: {
        width: 170,
        fontWeight: 700,
        fontStyle: 'italic'
    },
    flexForm: {
        display: 'flex',
        marginBottom: 10,
        justifyContent: 'center'
    },
    w20: {
        width: '20%'
    }
}))

function ViewStandartInspection({ open, onClose }) {
    const classes = useStyles()

    let partNumber = ""
    const handleChange = (e, name) => {
        console.log(name, 'name')
    }
    return (
        <Modal show={open} onHide={onClose} dialogClassName="custom-modal" >
            <Modal.Header closeButton>
                <Modal.Title><div className='div-icon'><i className="typcn typcn-plus"></i></div> Standar Inspection Parts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className={classes.flexForm}>
                        <span className={classes.label}>Part Number<span style={{ color: 'red' }}>*</span></span>
                        <div className={classes.w20}>
                            <Form.Control type="text" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} />
                        </div>
                    </div>
                    <div className={classes.flexForm}>
                        <span className={classes.label}>Part Desc.</span>
                        <div className={classes.w20}>
                            <Form.Control type="text" name='partNumber' value={partNumber} onChange={(e) => handleChange(e, 'partNumber')} />
                        </div>
                    </div>
                    <section className="slider container mb-3" style={{ width: '50%' }}>
                        <Carousel data-bs-theme="dark">
                            <Carousel.Item className='slide'>
                                <img
                                    className="d-block w-100"
                                    src={slide1}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item className='slide'>
                                <img
                                    className="d-block w-100"
                                    src={slide2}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item className='slide'>
                                <img
                                    className="d-block w-100"
                                    src={slide3}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </section>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ViewStandartInspection;