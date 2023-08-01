import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export class Symptom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symptom: null,
      quantity: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.open !== this.props.open) {
      this.setState({
        symptom: null,quantity: "",
      });
    }
  };

  handleChange = (e, name) => {
    const state = this.state;
    if (name === "symptom" && e === null) {
      this.setState({ [name]: null });
    } else if (name === "symptom") {
      this.setState({ [name]: e });
    } else {
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  };

  handleValidation = () => {
    const { symptom, quantity } = this.state;
    let err = [];
    if (symptom === null) {
      err = err.concat("Symptom");
    }
    if (quantity.length === 0 || quantity < 1) {
      err = err.concat("quantity");
    }
    return err;
  };

  handleSubmit = (e, param) => {
    const validate = this.handleValidation();

    if (validate.length === 0) {
      // Swal.fire({
      //   title: "Warning",
      //   text: "Are you sure you want to add this data?",
      //   icon: "warning",
      //   cancelButtonText: "Cancel!",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Yes!",
      //   confirmButtonColor: "#3085d6",
      //   showCancelButton: true,
      // }).then((result) => {
        // if (result.value) {
          this.props.onSubmit({
            symptom: this.state.symptom,
            quantity: this.state.quantity,
          });
          this.setState({symptom: null,quantity: ""})
          this.props.onClose();
        // }
      // });
    } else {
      const labelValidate = validate.toString();
      const addSpace = labelValidate.replace(/,/g, ", ");
      const msgValidate = addSpace + " : ...must be filled";
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: msgValidate,
      });
    }
  };

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="div-icon modal-icon">
              <i className="typcn typcn-plus"></i>
            </div>{" "}
            Symptom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-sm w-100">
            <div className="col-lg-12">
              <span className="font-weight-bold font-italic">Name Symptom</span>
              <Select
                className="w-100"
                name="symptom"
                value={this.state.symptom}
                onChange={(e) => this.handleChange(e, "symptom")}
                isClearable={true}
                options={this.props.listSymptomOption}
              />
            </div>
            <div className="col-lg-12 mt-3">
              <span className="font-weight-bold font-italic">Quantity</span>
              <Form.Control
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={(e) => this.handleChange(e, "quantity")}
                placeholder="Input Quantity"
              />
            </div>
          </div>

          <div>
            <hr className="mg-y-30" />
          </div>

          <div className="row row-sm">
            <div className="col-sm-6">
              <Button
                variant="success btn-block"
                onClick={(e) => this.handleSubmit(e)}
              >
                <i
                  className="typcn typcn-tick"
                  style={{ fontSize: "18px" }}
                ></i>{" "}
                Submit
              </Button>
            </div>
            <div className="col-sm-6">
              <Button variant="danger btn-block" onClick={this.props.onClose}>
                <i
                  className="typcn typcn-times"
                  style={{ fontSize: "18px" }}
                ></i>{" "}
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Symptom;
