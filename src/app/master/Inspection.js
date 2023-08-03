import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Table2Edit from '../commons/Table/Table2Edit';
import { ExpandMore } from '@material-ui/icons';
import AddStandardPicture from './components/addStandardPicture';
import ViewStandartInspection from './components/viewStandartInspection';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';

// const useStyles = makeStyles(() => ({
//     label: {
//         width: 200
//     },
// }))

function Inspection() {
    const [panel, setPanel] = useState(true)
    const [partNumber, setPartNumber] = useState("")
    const [vdf, setVdf] = useState("")
    const [vdt, setVdt] = useState("")
    const [valStatus, setValStatus] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(2)
    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [datas, setDatas] = useState(JSON.parse(localStorage.getItem("dataInspection")))

    // const datas = [
    //     { partNumber: '0823M99K8JZ9', partDesc: 'MPX 10W30 SJWA 0.8L FED', vdf: '01/02/2022', vdt: '31/12/2022', status: 'Active' },
    //     { partNumber: '0823M99K8JZ9', partDesc: 'MPX 10W30 SJWA 1L FED', vdf: '01/02/2022', vdt: '31/12/2022', status: 'Active' },
    //     { partNumber: '0823M99K8JZ9', partDesc: 'MPX 10W30 SJWA 1L FED', vdf: '01/02/2022', vdt: '31/12/2022', status: 'Non Active' },
    // ]

    const optPartNumber = [
        { value: '1', label: '1234' },
        { value: '2', label: '5678' }
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
            dataField: 'vdf',
            text: 'Valid Date From',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '100px' };
            }
        },
        {
            dataField: 'vdt',
            text: 'Valid Date To',
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
        },
        {
            dataField: 'id',
            text: 'Action',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            isDummyField: true,
            headerStyle: (colum, colIndex) => {
                return { width: '70px' };
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <span className="btnInTable">
                            <Button className="btn-success btn-brand btn-sm icon mg-r-2" onClick={(e) => handleView(e, row)}><i className="typcn typcn-eye"> </i></Button>
                            <Button className="btn-facebook btn-brand btn-sm icon" ><i className="typcn typcn-pencil"> </i></Button>
                        </span>
                    </div>
                );
            },
        },
    ]

    const handleView = (e, item) => {
        setOpenView(true)
    }

    const handleChange = (e, name) => {
        if (e) {
            if (name === 'pn') { setPartNumber(e.target.value.replace(/[^0-9\\.]+/g, '')) }
            else if (name === 'status') { setValStatus(e) }
        }
    }

    const handleChangeInput = (e, name) => {
        if (name === 'vdf') { setVdf(e.target.value) }
        else if (name === 'vdt') { setVdt(e.target.value) }
    }

    const handleSearch = () => {
        console.log(partNumber, vdf, vdt, valStatus, 'SEARCH')
    }

    const handlePageChange = (page, sizePerPage) => {
        setCurrentPage(page)
        setSizePerPage(sizePerPage)
    }

    const handleReset = () => {
        setPartNumber(null)
        setVdf("")
        setVdt("")
        setValStatus(null)
    }

    const handleAdd = () => {
        setOpenAdd(true)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    return (
        <div>
            <div className="container d-flex p-md-0">
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <div className="az-content-breadcrumb">
                        <span>Master</span>
                        <span>Inspection</span>
                    </div>
                    <h2 className="az-content-title">Master Inspection</h2>

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
                                                <span className="font-weight-bold font-italic">Part Number</span>
                                                <div className="row mg-b-4">
                                                    <div class="col-sm-8">
                                                        <Form.Control
                                                            type="text"
                                                            name="pn"
                                                            value={partNumber}
                                                            onChange={(e) => handleChange(e, 'pn')}
                                                            style={{minHeight: 48}}
                                                        />
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <button>
                                                            <i
                                                                className="typcn typcn-camera"
                                                                style={{ fontSize: "28px" }}
                                                            ></i>{" "}
                                                        </button>
                                                    </div>
                                                    <div class="col-sm-1" style={{marginLeft: -20}}>
                                                        <button>
                                                            <i
                                                                className="typcn typcn-zoom-outline"
                                                                style={{ fontSize: "28px" }}
                                                            ></i>{" "}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* <Select name="pn" value={partNumber} options={optPartNumber} onChange={(e) => handleChange(e, 'pn')} isClearable /> */}
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Valid  Date From</span>
                                                <input type="date" className="form-control" name="vdf" value={vdf} onChange={(e) => handleChangeInput(e, 'vdf')} />
                                            </div>
                                        </div>

                                        <div className="row mg-b-4 mt-2">
                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Status</span>
                                                <Select name="status" value={valStatus} options={optStatus} onChange={(e) => handleChange(e, 'status')} isClearable />
                                            </div>

                                            <div className="col-lg-5">
                                                <span className="font-weight-bold font-italic">Valid  Date To</span>
                                                <input type="date" className="form-control" name="vdt" value={vdt} onChange={(e) => handleChangeInput(e, 'vdt')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className="az-dashboard-nav" style={{ marginTop: 20 }}>
                            {/* <nav className="nav">
                                <a className="nav-link active" data-toggle="tab" href="#/">
                                    <Button variant="success btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" ><i className="typcn typcn-arrow-right" style={{ fontSize: '18px' }}></i> Process</Button>
                                </a>
                            </nav> */}

                            <nav className="nav">
                                <a className="nav-link" href="#/">
                                    <Button variant="success btn-block" className="btn-info btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-zoom-outline" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Search</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="danger btn-block" className="btn-danger btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleReset}><i className="typcn typcn-arrow-sync" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Reset</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="primary btn-block" className="btn-primary btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }} onClick={handleAdd}><i className="typcn typcn-plus" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Add Standard Picture</Button>
                                </a>
                                <a className="nav-link" href="#/">
                                    <Button variant="primary btn-block" className="btn-success btn-brand btn-sm icon mg-r-2" style={{ lineHeight: '28px', display: 'flex' }}><i className="typcn typcn-upload" style={{ fontSize: '18px', lineHeight: '28px' }}></i> Export Excel</Button>
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

            <AddStandardPicture open={openAdd} onClose={handleCloseAdd} />
            <ViewStandartInspection open={openView} onClose={() => setOpenView(false)} />
        </div>
    )
}

export default Inspection
