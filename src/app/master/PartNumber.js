import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Table2Edit from '../commons/Table/Table2Edit';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import dtPart from '../commons/jsonFile/partsNumber.json'

function PartNumber() {
    const [panel, setPanel] = useState(true)
    const [partNumber, setPartNumber] = useState("")
    const [mrp, setMrp] = useState("")
    const [vendor, setVendor] = useState(null)
    const [valStatus, setValStatus] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(2)
    const [datas, setDatas] = useState(dtPart)

    const optVendor = [
        { value: '1', label: 'Vendor A' },
        { value: '2', label: 'Vendor B' }
    ]

    const optStatus = [
        { value: '1', label: 'All' },
        { value: '2', label: 'Active' },
        { value: '3', label: 'Non-Active' }
    ]

    const columns = [
        {
            dataField: '#',
            text: '#',
            headerAlign: 'center',
            align: 'center',
            formatter: (cell, row, rowIndex) => {
                let rowNumber = (currentPage - 1) * sizePerPage + (rowIndex + 1);
                return <span>{rowNumber}</span>;
            },
            headerStyle: (colum, colIndex) => {
                return { width: '40px' };
            },
        },
        {
            dataField: 'part_number',
            text: 'Part Number',
            headerAlign: 'center',
            align: 'left',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'part_number_desc',
            text: 'Part Description',
            headerAlign: 'center',
            align: 'left',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '190px' };
            },
        },
        {
            dataField: 'mrp_controller',
            text: 'MRP Controller',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'vendor_desc',
            text: 'Vendor',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'status',
            text: 'Status',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '80px' };
            }
        }
    ]

    const handleChange = (e, name) => {
        if (e) {
            if (name === 'pn') { setPartNumber(e) }
            else if (name === 'status') { setValStatus(e) }
            else if (name === 'vendor') { setVendor(e) }
        }
    }

    const handleChangeInput = (e, name) => {
        if (name === 'mrp') { setMrp(e.target.value) }
        else if(name === 'partNumber') { setPartNumber(e.target.value)}
    }

    const handleSearch = () => {
        console.log(partNumber, mrp, vendor, valStatus, 'SEARCH')
        if(partNumber !== "") { setDatas(dtPart.filter((el) => el.part_number_desc === partNumber)) }
    }

    const handlePageChange = (page, sizePerPage) => {
        setCurrentPage(page)
        setSizePerPage(sizePerPage)
    }

    const handleReset = () => {
        setPartNumber("")
        setMrp("")
        setVendor(null)
        setValStatus(null)
        setDatas(dtPart)
    }

    return (
        <div>
            <div className="container d-flex p-md-0">
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <div className="az-content-breadcrumb">
                        <span>Master</span>
                        <span>Part Number</span>
                    </div>
                    <h2 className="az-content-title">Master Part Number</h2>

                    <Box sx={{ width: '100%' }}>
                        <Accordion expanded={panel} onChange={() => setPanel(!panel)} className='accordionRoot'>
                            <AccordionSummary
                                className='panelSummary'
                                expandIcon={<ExpandMore sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ backgroundColor: '#fafafa', borderBottom: '1px solid #ececec' }}
                            >
                                <Typography style={{ fontSize: '1rem', fontWeight: 'bold' }}>Filter</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="row row-sm mg-b-4 w-100">
                                    <div className="col-lg-12">
                                        <div className="row mg-b-4">
                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Part Number Desc</span>
                                                <input type="text" className="form-control" name="partNumber" value={partNumber} onChange={(e) => handleChangeInput(e, 'partNumber')} />
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">MRP Controller</span>
                                                <input type="text" className="form-control" name="mrp" value={mrp} onChange={(e) => handleChangeInput(e, 'mrp')} />
                                            </div>
                                        </div>

                                        <div className="row mg-b-4 mt-2">
                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Status</span>
                                                <Select name="status" value={valStatus} options={optStatus} onChange={(e) => handleChange(e, 'status')} isClearable />
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Vendor Desc</span>
                                                <Select name="vendor" value={vendor} options={optVendor} onChange={(e) => handleChange(e, 'vendor')} isClearable />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className="az-dashboard-nav" style={{ marginTop: 20 }}>
                            <nav className="nav">
                                <a className="nav-link" href="#/">
                                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleSearch}><i className="typcn typcn-zoom-outline" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Search</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="danger btn-block" className="btn-danger btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleReset}><i className="typcn typcn-arrow-sync" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Reset</Button>
                                </a>
                                <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
                            </nav>
                        </div>
                        <div className="az-content-label mg-b-5">
                            <Table2Edit
                                caption=''
                                tableHead={columns}
                                datas={datas}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default PartNumber
