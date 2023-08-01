import React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';

function PreviewDashboard(props) {
  return (
    <Modal show={props.open} onHide={props.onClose} dialogClassName="custom-modal" >
      <Modal.Header closeButton>
        <Modal.Title><div className='div-icon'><i className="typcn typcn-eye"></i></div> Preview Dashboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
          <Tab eventKey="home" title="Paper/Idea">
            <div className="container d-flex p-md-0 mg-t-20 mg-b-10">
              <div className="az-content-body pd-lg-l-10 d-flex flex-column">

                <div className="az-content-label mg-b-10">Personal Data</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Full Name</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.fullName}</span>
                  </div>

                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Employee ID</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.employeeId}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Function</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.job}</span>
                  </div>

                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Discipline</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.discipline}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Innovation Purpose</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.purpose}</span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Abstraction</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Title</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.abstract_title}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Description</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.abstract_desc}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Abstract</span>
                  </div>
                  <div className="col-lg-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: props.row?.abstract_content }}
                    />
                  </div>
                </div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Attachment</span><br />
                  </div>
                  <div className="col-lg-4" style={{ marginTop: '-15px', fontSize: '28px' }}>
                    <span><i className="typcn typcn-download"> </i></span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Novelty</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Type</span>
                  </div>
                  <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                    <span>
                      {props.row?.novelty_type} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                    </span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Impact Value</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">ROI</span>
                  </div>
                  <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                    <span>
                      {props.row?.roi_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                    </span>
                  </div>
                </div>

                <div className="row row-sm mg-t-10">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">HSE</span>
                  </div>
                  <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                    <span>
                      {props.row?.hse_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                    </span>
                  </div>
                </div>



                <div className="row row-sm mg-t-10">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Cost Saving</span>
                  </div>
                  <div className="col-lg-4" style={{ marginTop: '-15px' }}>
                    <span>
                      {props.row?.cost_saving_value} <i className="typcn typcn-download" style={{ fontSize: '28px' }}> </i>
                    </span>
                  </div>
                </div>



                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Application Boundary</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Asset Hierarchy Level</span>
                  </div>
                  <div className="col-lg-4">
                    <span>
                      {props.row?.hierarchy_level}
                    </span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Change Level</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Level</span>
                  </div>
                  <div className="col-lg-4">
                    <span>
                      {props.row?.change_level}
                    </span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Risk & Mitigation Plan</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Description</span>
                  </div>
                  <div className="col-lg-4">
                    <span>
                      {props.row?.description}
                    </span>
                  </div>
                </div>

              </div>{/* az-content-body */}
            </div>{/* container */}
          </Tab>

          <Tab eventKey="cluster" title="Clustering">
            <div className="container d-flex p-md-0 mg-t-20 mg-b-10">
              <div className="az-content-body pd-lg-l-10 d-flex flex-column">

                <div className="az-content-label mg-b-10">Cluster & Criteria</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Assign Cluster</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.clusterLabel}</span>
                  </div>

                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Criteria</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.criteriaLabel}</span>
                  </div>
                </div>

                <div>
                  <hr className="mg-y-30" />
                </div>

                <div className="az-content-label mg-b-10">Assign Reviewer</div>

                <div className="row row-sm">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Assign Team Purpose</span>
                  </div>
                  <div className="col-lg-4">
                    <span>To Review Abstract</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Start Date</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.start_date?.substring(0, 10)}</span>
                  </div>
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">End Date</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.end_date?.substring(0, 10)}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Venue</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.venue}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Abstract Title</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.abstract_title}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Leader</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.leaderLabel}</span>
                  </div>
                </div>
                <div className="row row-sm mt-3">
                  <div className="col-lg-2">
                    <span className="font-weight-bold font-italic">Assign Team Member</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{props.row?.memberLabel}</span>
                  </div>
                </div>

              </div>{/* az-content-body */}
            </div>{/* container */}
          </Tab>

          <Tab eventKey="reviewing" title="Reviewing">
            3
          </Tab>

          <Tab eventKey="judging" title="Judging">
            4
          </Tab>

          <Tab eventKey="award" title="Award">
            5
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default PreviewDashboard;