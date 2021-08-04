import React, { useEffect, useState } from "react";
import Datas from "../data/team/team-slider.json";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { StyleFun } from "./styles/teamSlider.js";
import { fetchFaculty } from "./../apis/api";
import { useClientStore } from "./../contextProviders/clientContext";
import { Observer } from "mobx-react";
import { buildFaculty, updateColorObj } from "../utility";
import { Modal, Button } from "react-bootstrap";

const TeamSlider = () => {
  const settings = {
    slidesPerView: 4,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    watchSlidesVisibility: true,
    pagination: {
      el: ".slider-dot.text-center",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
    },
  };
  const clientStore = useClientStore();
  const [dataArray, setDataArray] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);

  useEffect(() => {
    getFaculty();
  }, []);
  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  const getFaculty = async () => {
    const res = await fetchFaculty(clientStore.webHash, 10);
    // console.log("facultyData", res.response);
    clientStore.facultyData = buildFaculty(res.response);
    setDataArray(clientStore.facultyData);
    setDataStatus(true);
    // console.log("facultyData", buildFaculty(res.response));
  };

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modal, setModal] = useState(null);

  const modalFun = (i) => {
    console.log("From Modal", i);
    let m = (
      <Modal
        show={true}
        onHide={() => {
          // setShow(false);
          setModal(null);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{dataArray[i].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={4}>
                <img
                  src={dataArray[i].personImage}
                  alt=""
                  className="img-fluid"
                  width="100%"
                  height="100%"
                />
              </Col>
              <Col>
                <div className="img-content text-center">
                  <h5>{dataArray[i].personName.split(",")[0]}</h5>
                  <p>{dataArray[i].personName.split(",").length === 2 ?
                    dataArray[i].personName.split(",")[1]
                    : "Faculty"
                  }</p>
                </div>
                <div style={{
                  marginTop: "30px"
                }}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataArray[i].personDetails,
                    }}
                  ></p>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              // setShow(false);
              setModal(null);
            }}
          >
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
    );
    setModal(m);
    handleShow();
  };

  return (
    <Observer>
      {() => {
        return (
          <Styles>
            {/* Team Slider */}
            <section className="team-member-area">
              <Container>
                <Row>
                  <Col md="12">
                    <div className="sec-title text-center">
                      <h4>{Datas.secTitle}</h4>
                    </div>
                  </Col>
                  <Col md="12" className="team-slider">
                    {dataStatus ? (
                      <Swiper {...settings}>
                        {dataArray.map((data, i) => (
                          <div
                            className="team-item"
                            key={i}
                            onClick={() => {
                              modalFun(i);
                              setShow(true);
                            }}
                          >
                            <img
                              src={data.personImage}
                              alt=""
                              className="img-fluid"
                              width="100%"
                              height="100%"
                            />
                            <div className="img-content text-center">
                              <h5>{data.personName.split(",")[0]}</h5>
                              <p>{data.personName.split(",").length === 2 ?
                                data.personName.split(",")[1]
                                : "Faculty"
                              }</p>
                              {/* <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                  <a
                                    href={
                                      process.env.PUBLIC_URL +
                                      data.socialLinks.facebook
                                    }
                                  >
                                    <i className="fab fa-facebook-f"></i>
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href={
                                      process.env.PUBLIC_URL +
                                      data.socialLinks.twitter
                                    }
                                  >
                                    <i className="fab fa-twitter"></i>
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href={
                                      process.env.PUBLIC_URL +
                                      data.socialLinks.youtube
                                    }
                                  >
                                    <i className="fab fa-youtube"></i>
                                  </a>
                                </li>
                              </ul> */}
                            </div>
                          </div>
                        ))}
                      </Swiper>
                    ) : null}
                  </Col>
                </Row>
              </Container>
              {modal}
            </section>
          </Styles>
        );
      }}
    </Observer>
  );
};

export default TeamSlider;
