import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      job: "",
      dept: "",
      level: "",
    };
  }

  componentDidMount = () => {
    const isLogin = localStorage.getItem("isLogin");
    // console.log(isLogin, 'isLogin')
    if (isLogin === null || isLogin === "false" || isLogin === undefined) {
      this.props.history.push("/general-pages/signin");
    }
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    this.setState({
      name: dataUser?.name,
      job: dataUser?.job,
      dept: dataUser?.dept,
      level: dataUser?.level,
    });
  };

  closeMenu(e) {
    e.target.closest(".dropdown").classList.remove("show");
    e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  openInNewTab = (param) => {
    let url = "https://tech-solution-app.netlify.app/";
    if (param === 1) {
      url = "https://tech-solution-app.netlify.app/#/screening";
    } else if (param === 2) {
      url = "https://tech-solution-app.netlify.app/#/registration";
    } else if (param === 3) {
      url = "https://tech-solution-app.netlify.app/#/qualification";
    } else if (param === 4) {
      url = "https://tech-solution-app.netlify.app/#/operation";
    } else if (param === 5) {
      url = "https://tech-solution-app.netlify.app/#/cessation";
    } else if (param === 6) {
      url = "https://tech-solution-app.netlify.app/#/dashboard";
    }
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to leave the application?",
      icon: "warning",
      cancelButtonText: "Cancel!",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("isLogin");
        // localStorage.clear();
        this.props.history.push("/general-pages/signin");
      }
    });
  };

  render() {
    return (
      <div>
        <div className="az-header">
          <div className="container">
            <div className="az-header-left">
              <a href="/" className="az-logo">
                <img
                  src={require("../../assets/images/ogya.png")}
                  alt=""
                  width={100}
                  height={35}
                  style={{ marginRight: "5px", marginTop: 10 }}
                ></img>
                {/* <span></span> Center of Excellence */}
              </a>
              <a
                id="azMenuShow"
                onClick={(event) => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
            </div>
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <Link to="/" className="az-logo">
                  <span></span> OGYA
                </Link>
                <a
                  href="#/"
                  onClick={(event) => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              <ul className="nav">
                <li
                  className={
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dashboard" className="nav-link">
                    <i className="typcn typcn-device-desktop"></i> Dashboard
                  </Link>
                </li>
                {this.state.level === "admin" ? (
                  <>
                    <li className="nav-item">
                      <Dropdown
                        className={
                          this.isPathActive("/mia")
                            ? "nav-item active"
                            : "nav-item"
                        }
                      >
                        <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                          <i className="typcn typcn-document"></i> Master
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="az-menu-sub">
                          <Link
                            to="/master/inspection"
                            className={
                              this.isPathActive("/master/inspection")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-database"></i> Master
                            Inspection
                          </Link>
                          <Link
                            to="/master/sympstomps"
                            className={
                              this.isPathActive("/master/sympstomps")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-database"></i> Master
                            Sympstoms
                          </Link>
                          <Link
                            to="/master/part-number"
                            className={
                              this.isPathActive("/master/part-number")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-database"></i> Master Part
                            Number
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li
                      className={
                        this.isPathActive("/monitoring-rs")
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <Link to="/monitoring-rs" className="nav-link">
                        <i className="typcn typcn-chart-line"></i> Monitoring
                        Reject System
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li className="nav-item">
                  <Dropdown
                    className={
                      this.isPathActive("/ui-elements") ||
                      this.isPathActive("/form") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                      <i className="typcn typcn-shopping-cart"></i> Transaction
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="az-menu-sub">
                      {this.state.level === "operator" ||
                      this.state.level === "admin" ? (
                        <>
                          <Link
                            to="/transaction/createrc"
                            className={
                              this.isPathActive("/transaction/createrc")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-clipboard"></i> Create
                            Reject Card
                          </Link>
                          <Link
                            to="/transaction/printrc"
                            className={
                              this.isPathActive("/transaction/printrc")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-printer"></i> Print Reject
                            Card
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.level === "supplier" ||
                      this.state.level === "admin" ? (
                        <>
                          <Link
                            to="/transaction/printsj"
                            className={
                              this.isPathActive("/transaction/printsj")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-printer"></i> Print Surat
                            Jalan
                          </Link>
                          <Link
                            to="/transaction/givepart"
                            className={
                              this.isPathActive("/transaction/givepart")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            <i className="typcn typcn-camera"></i> Give Part
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.level === "operator" ||
                      this.state.level === "admin" ? (
                        <Link
                          to="/transaction/receivepart"
                          className={
                            this.isPathActive("/transaction/receivepart")
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          <i className="typcn typcn-camera"></i> Receive Part
                        </Link>
                      ) : (
                        <></>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div className="az-header-right">
              <div className="az-header-message">
                <Link to="#/">
                  <i className="typcn typcn-messages"></i>
                </Link>
              </div>
              <Dropdown
                className="az-header-notification"
                style={{ cursor: "pointer" }}
              >
                <Dropdown.Toggle as={"a"} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={(event) => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media new">
                      <div className="az-img-user online">
                        <img
                          src={require("../../assets/images/img2.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Ran</strong> just created a new reject card
                        </p>
                        <span>Mar 13 04:16am</span>
                      </div>
                    </div>
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require("../../assets/images/img4.jpg")}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>PT Denso Sales Indonesia </strong> just
                          created a new surat jalan
                        </p>
                        <span>Mar 13 02:56am</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                className="az-profile-menu"
                style={{ cursor: "pointer" }}
              >
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  <img
                    src={require("../../assets/images/img3.jpg")}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={(event) => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <div className="az-img-user">
                      <img
                        src={require("../../assets/images/img3.jpg")}
                        alt=""
                      ></img>
                    </div>
                    <h5>{this.state.name}</h5>
                    <span>
                      <b>{this.state.dept}</b>
                    </span>
                    <span>{this.state.job}</span>
                  </div>

                  <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </a>
                  <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-time"></i> Activity Logs
                  </a>
                  <a href="#/" className="dropdown-item">
                    <i className="typcn typcn-cog-outline"></i> Account Settings
                  </a>
                  <Link
                    to="#/"
                    onClick={this.handleLogout}
                    className="dropdown-item"
                  >
                    <i className="typcn typcn-power-outline"></i> Sign Out
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
