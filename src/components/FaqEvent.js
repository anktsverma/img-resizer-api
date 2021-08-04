import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StyleFun } from "./styles/faqEvent.js";
import { fetchNotification, fetchFAQ } from "./../apis/api";
import { useClientStore } from "./../contextProviders/clientContext";
import { Observer } from "mobx-react";
import { buildFaq, buildNotification } from "../utility";
import { Modal, Button } from "react-bootstrap";


const FaqEvent = () => {
  const clientStore = useClientStore();
  const [faqDataArray, setFaqDataArray] = useState([]);
  const [notificationsDataArray, setNotificationsDataArray] = useState([]);
  const [notifyData, setNotifyData] = useState({})
  const [notiDataStatus, setNotiDataStatus] = useState(false)
  const [faqDataStatus, setFAQDataStatus] = useState(false);

  useEffect(() => {
    const accordionButton = document.querySelectorAll(".accordion-button");
    accordionButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "accordion-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "accordion-content";
          content.style.maxHeight = "0";
        }
      });
    });
  });

  useEffect(() => {
    getNotification();
    getFAQ();
    // console.log("FAQ STATE", faqDataArray)
  }, []);

  const getNotification = async () => {
    const res = await fetchNotification(clientStore.webHash);
    // console.log("Notifications", res.response);
    if (res.status === "success") {
      let notifications = buildNotification(res.response);
      setNotificationsDataArray(notifications);
      setNotifyData(notifications[0])
      setNotiDataStatus(true)
    }
    // console.log("Notifications", clientStore.notifications);
  };

  const getFAQ = async () => {
    const res = await fetchFAQ(clientStore.webHash);
    if (res.status === "success") {

      clientStore.faqData = buildFaq(res.response);
      setFaqDataArray(clientStore.faqData);
      setFAQDataStatus(true)
    }

  };

  const [notifyLen, setNotifyLen] = useState(1);


  const [show, setShow] = useState(false);


  const handleShow = (i) => {
    setNotifyData(notificationsDataArray[i]);
    setShow(true);
  }

  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))


  return (
    <Observer>
      {() => {
        return (
          <Styles>
            {/* Faq & Event */}
            <section className="event-faq-area">
              <Modal
                show={show}
                onHide={() => {
                  setShow(false);
                  // setModal(null);
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>{notifyData.eventTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="event-box eventModal">
                    <img
                      src={notifyData.eventImg}
                      alt=""
                    />
                    <div
                      className="modal-content-data"
                    >

                      <div className="event-date text-center">
                        <p>Publishing Date : {notifyData.eventFullDate}</p>
                      </div>
                      <div className="event-details">

                        <p
                          dangerouslySetInnerHTML={{
                            __html: notifyData.eventdesc,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShow(false);
                      // setModal(null);
                    }}
                  >
                    Close
                  </Button>

                </Modal.Footer>
              </Modal>
              <Container>
                <Row style={{ display: "flex", alignItems: "start" }}>
                  {notiDataStatus ? (<Col md="6" style={{ margin: "auto" }}>
                    <div className="event-area">
                      <Row>
                        <Col md="12">
                          <div className="sec-title">
                            <h4>
                              <span>Notifications</span>
                            </h4>
                          </div>
                        </Col>
                        <Col md="12">
                          {notificationsDataArray.map((eventData, i) => {
                            if (i > notifyLen) return null;
                            else
                              return (
                                <div className="event-box d-flex" key={i}>
                                  <div className="event-date text-center">
                                    <p>{eventData.eventDate}</p>
                                  </div>
                                  <div className="event-details"
                                    onClick={() => handleShow(i)}
                                  >
                                    <h6>
                                      {eventData.eventTitle}
                                    </h6>

                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: `${eventData.eventdesc.slice(0, 200)} ...`,
                                      }}
                                    />
                                    <span className="readmore">
                                      Read More ...
                                    </span>
                                  </div>
                                </div>
                              );
                          })}
                        </Col>
                      </Row>
                    </div>
                    <Col className="btn-container">
                      {notificationsDataArray.length > 2 ? (
                        notifyLen <= 1 ?
                          <button
                            onClick={() => {
                              setNotifyLen(notificationsDataArray.length)
                            }}
                          >Show More</button> :
                          <button
                            onClick={() => {
                              setNotifyLen(1)
                            }}
                          >Show Less</button>
                      ) : null}

                    </Col>
                  </Col>) : null}
                  {faqDataArray.length != 0 ? (<Col md="6" style={{ margin: "0 auto" }} >
                    <div className="faq-area">
                      <div className="sec-title">
                        <h4>
                          Frequently Asked <span>Questions</span>
                        </h4>
                      </div>
                      <div className="faq-box">
                        {faqDataArray.map((faqData, i) => {
                          if (i > 2) {
                            return null;
                          } else {
                            return (
                              <div className="faq-item" key={i}>
                                <button className="accordion-button active">
                                  <div className="accordion-icon">
                                    <i className="las la-plus"></i>
                                  </div>
                                  <p>{faqData.faqTitle}</p>
                                </button>
                                <div className="accordion-content show">
                                  <p>{faqData.faqDesc}</p>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </Col>) : null}
                </Row>
              </Container>
            </section>
          </Styles>
        );
      }}
    </Observer >
  );
};

export default FaqEvent;
