import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import StickyMenu from "./common/StickyMenu";
import MobileMenu from "./common/MobileMenu";
import { StyleFun } from "./styles/header.js";
import { useClientStore } from "../contextProviders/clientContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import { fetchDynamicButton } from "../apis/api";


const Header = () => {
  const clientStore = useClientStore();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [logo, setLogo] = useState("");
  const [dynamicButton, setDynamicButton] = useState({});

  const menu = clientStore.webConfig.menu;


  useEffect(() => {
    updateData();
  }, [phone, toggle, dataStatus]);


  useEffect(() => {
    getDynamicButton();
  }, [])

  const updateData = () => {
    if (clientStore.instituteDetails["About Us"] !== undefined && !dataStatus) {
      setPhone(clientStore.instituteDetails.Contact1.slice(0, 10));
      setEmail(clientStore.instituteDetails.Email1);
      setAddress(clientStore.instituteDetails.Address2);
      setLogo(clientStore.logo)
      setDataStatus(true);
    }
    if (!dataStatus) setToggle(toggle + 1);
  };

  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))


  const getDynamicButton = async () => {
    const res = await fetchDynamicButton(clientStore.webHash);
    // const hash = "56609cdc79b2838b15c2950d5dbf654b"
    // const res = await fetchDynamicButton(hash);
    let obj = {
      tab: res.tab_name,
      arr: res.response,
      status: res.status,
    }
    setDynamicButton(obj)
  }
  if (location.pathname !== "/") return null;
  else
    return (
      <Styles>
        {/* Topbar */}
        <section className="top-bar">
          <Container>
            <Row>
              <Col lg="6" md="5">
                <div className="bar-left">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <i className="las la-map-marker"></i>
                      {address}
                    </li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/faq"}>
                        Have Questions
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

            </Row>
          </Container>
        </section>

        {/* Logo Area */}
        <section
          className="logo-area"
        >
          <Container>
            <Row>
              <Col md="3">
                <div className="logo">
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    <img src={logo} alt="" width="auto" height="auto" />
                  </Link>
                </div>
              </Col>
              <Col md="9" style={{ display: "flex" }}>
                <div
                  className="logo-contact-box d-flex justify-content-end"
                  style={{ margin: "auto" }}
                >
                  <div className="emcontact-box d-flex">
                    <div className="box-icon">
                      <i className="flaticon-phone-call"></i>
                    </div>
                    <div className="box-content">
                      <p>Call Us Now</p>
                      <a href={`tel:${phone}`} style={{ color: "inherit" }}>
                        <span>{phone}</span>
                      </a>
                    </div>
                  </div>
                  <div className="emcontact-box d-flex">
                    <div className="box-icon">
                      <i className="flaticon-envelope"></i>
                    </div>
                    <div className="box-content">
                      <p>Enquiry Us</p>
                      <a href={`mailto:${email}`} style={{ color: "inherit" }}>
                        <span>{email}</span>
                      </a>
                    </div>
                  </div>
                  <div className="apply-btn">
                    <a href="https://www.speedlabs.in" target="_blank">
                      SpeedLabs
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Navbar */}
        <section className="main-menu">
          <Container>
            <Row>
              <Col md="12">
                <div className="main-menu-box">
                  <div className="menu-box d-flex justify-content-between">
                    <ul className="nav menu-nav">

                      {
                        menu && menu[0] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/"}
                            >
                              Home
                            </Link>
                          </li>
                        ) : (null)
                      }

                      {
                        menu && menu[1] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/about"}
                            >
                              About
                            </Link>
                          </li>
                        ) : (null)
                      }

                      {
                        menu && menu[2] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/course-list"}
                            >
                              Courses
                            </Link>
                          </li>
                        ) : (null)
                      }
                      {
                        menu && menu[3] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/packages"}
                            >
                              Packages
                            </Link>
                          </li>
                        ) : (null)
                      }
                      {
                        menu && menu[4] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/gallery"}
                            >
                              Gallery
                            </Link>
                          </li>
                        ) : (null)
                      }
                      {
                        menu && menu[7] == 'Y' ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href={"https://" + clientStore.webDetails.sub_domain}
                              target="blank"
                            >
                              Online Test
                            </a>
                          </li>
                        ) : (null)
                      }
                      {
                        menu && menu[10] == 'Y' ? (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/payonline"}
                            >
                              Pay Online
                            </Link>
                          </li>
                        ) : (null)
                      }
                      {dynamicButton.status === "success" ? (<li className="nav-item">
                        <Link
                          className="nav-link dropdown-toggle"
                          to={process.env.PUBLIC_URL + "/"}
                          data-toggle="dropdown"
                          style={{
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          {dynamicButton.tab} <RiArrowDropDownLine className="moreButton" />
                        </Link>
                        <ul className="dropdown list-unstyled">
                          {dynamicButton.arr.length > 0 ? (
                            <div>
                              {dynamicButton.arr.map((el, i) => {
                                return (
                                  <li className="nav-item" key={i}>
                                    <a
                                      className="nav-link"
                                      href={el.url}
                                    >
                                      {el.title}
                                    </a>
                                  </li>
                                )
                              })}
                            </div>
                          ) : null}
                        </ul>
                      </li>) : null}
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          to={process.env.PUBLIC_URL + "/"}
                          data-toggle="dropdown"
                          style={{
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          More <RiArrowDropDownLine className="moreButton" />
                        </Link>
                        <ul className="dropdown list-unstyled">

                          {
                            menu && menu[11] == 'Y' ? (
                              <li className="nav-item">
                                <Link
                                  className="nav-link"
                                  to={process.env.PUBLIC_URL + "/contact"}
                                >
                                  Contact
                                </Link>
                              </li>
                            ) : (null)
                          }


                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/faq"}
                            >
                              FAQ
                            </Link>
                          </li>


                          {
                            menu && menu[6] == 'Y' ? (
                              <li className="nav-item">
                                <Link
                                  className="nav-link"
                                  to={process.env.PUBLIC_URL + "/career"}
                                >
                                  Career Form
                                </Link>
                              </li>
                            ) : (null)
                          }

                          {
                            menu && menu[8] == 'Y' ? (
                              <li className="nav-item">
                                <Link
                                  className="nav-link"
                                  to={process.env.PUBLIC_URL + "/franchise"}
                                >
                                  Franchise Form
                                </Link>
                              </li>
                            ) : (null)
                          }

                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/admission"}
                            >
                              Admission Form
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/alerts"}
                            >
                              Alerts
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={process.env.PUBLIC_URL + "/achievements"}
                            >
                              Achievements
                            </Link>
                          </li>

                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Sticky Menu */}
        <StickyMenu logo={logo} />

        {/* Mobile Menu */}
        <MobileMenu />
      </Styles >
    );
};

export default Header;
