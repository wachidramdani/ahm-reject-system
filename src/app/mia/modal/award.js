import React, { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

export class Award extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      eo_award: '',
      date_award: new Date(),
      vanue_award: null,
      budget_award: null,
      book_award: null
    }
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const contentStateToRaw = convertToRaw(contentState)
    // console.log('content state', draftToHtml(contentStateToRaw));

    this.setState({ editorState, contentState: contentStateToRaw, abstract_content: draftToHtml(contentStateToRaw) })
  }

  handleChange = (e, name) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title><div className='div-icon modal-icon'><i className="typcn typcn-pencil"></i></div> Event Checkist Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row row-sm">

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Name of EO</span>
              <div className="w-100">
                <Form.Control type="text" name='eo_award' value={this.state.eo_award} onChange={(e) => this.handleChange(e, 'eo_award')} placeholder="Full Name" />
              </div>
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Date of Event</span>
              <div className="w-50">
                <DatePicker selected={this.state.date_award} name="date_award" onChange={(date) => this.setState({ date_award: date })} className="form-control" style={{ 'z-index': 3 }} />
              </div>
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Venue</span>
              <Form.Control type="text" name='venue_award' value={this.state.venue_award} onChange={(e) => this.handleChange(e, 'venue_award')} placeholder="Input Venue" />
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Budget</span>
              <Form.Control type="text" name='budget_award' value={this.state.budget_award} onChange={(e) => this.handleChange(e, 'budget_award')} placeholder="Input Budget" />
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Ceremony Rundown</span>
              <Editor
                // name = "abstract_content"
                // value={this.state.abstract_content}
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                editorStyle={{ border: "1px solid #cdcdcd", height: "270px" }}
              // onChange={(e) => this.handleChange(e, 'abstract_content')}
              />
            </div>

            <div className="col-lg-12 mg-t-15">
              <span className="font-weight-bold font-italic">Invite Book Calendar</span>
              <Form.Control type="text" name='book_award' value={this.state.book_award} onChange={(e) => this.handleChange(e, 'book_award')} placeholder="Input Invite Book Calendar" />
            </div>

            <div className='w-100'>
              <hr className="mg-y-20" />
            </div>

            <div className="row row-sm w-100" style={{padding: '0 0 0 20px'}}>
              <div className="col-lg-6">
                <Button variant="success btn-block" onClick={this.props.onClose}><i className="typcn typcn-tick" style={{ fontSize: '18px' }}></i> Submit</Button>
              </div>
              <div className="col-lg-6">
                <Button variant="danger btn-block" onClick={this.props.onClose}><i className="typcn typcn-times" style={{ fontSize: '18px' }}></i> Cancel</Button>
              </div>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Award