import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { StyleFun } from "./styles/course.js";
import { useParams } from "react-router-dom";
import { useClientStore } from "../../contextProviders/clientContext";
import { Observer } from "mobx-react";
import { fetchCourseDetailsById } from "./../../apis/api";
import PageNotFound from "../404/PageNotFound";
import Loader from "../../Loader";

const CourseDetails = () => {
  let { courseID } = useParams();
  useEffect(() => {
    const courseButton = document.querySelectorAll(".course-button");
    courseButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "course-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "course-content";
          content.style.maxHeight = "0";
        }
      });
    });
  }, []);
  const clientStore = useClientStore();
  const [dataStatus, setDataStatus] = useState(false);
  const [courseName, setCourseName] = useState(" ");
  const [courseDesc, setCourseDesc] = useState(" ");
  const [courseOverview, setCourseOverview] = useState(" ");
  const [courseKeyBenefits, setCourseKeyBenefits] = useState(" ");
  const [courseEligibility, setCourseEligibility] = useState(" ");
  const [empty, setEmpty] = useState(false)
  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    const res = await fetchCourseDetailsById(clientStore.webHash, courseID);
    if (res.status === "success") {
      setCourseName(res.response[0]["course_name"]);
      setCourseDesc(res.response[0]["course_detail"]);
      setCourseOverview(res.response[0]["course_overview"]);
      setCourseKeyBenefits(res.response[0]["course_key_benefits"]);
      setCourseEligibility(res.response[0]["course_eligibility"]);
      setDataStatus(true);
    }
    else setEmpty(true)
  };

  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  const [bread, setBread] = useState(true)
  const notFound = () => {
    setBread(false)
    return <PageNotFound />
  }


  return (
    <Observer>
      {() => {
        return (
          <div className="main-wrapper course-details-page">
            {/* Header 2 */}
            {/* <HeaderTwo /> */}

            {/* Breadcroumb */}
            {bread ? <BreadcrumbBox title="Course Details" /> : null}

            <Styles>
              {/* Course Details */}
              {dataStatus ? (<section className="course-details-area">
                <Container>
                  <Row>
                    <Col lg="9" md="10" sm="12" style={{ margin: "auto" }}>
                      <div className="course-details-top">
                        <div className="heading">
                          <h4> Course : {courseName}</h4>
                        </div>

                        <div className="course-details-banner">
                          <img
                            src={"https://images.unsplash.com/photo-1619089654126-4f6d1df6fb69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1063&q=80"}

                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="course-tab-list">
                          <Tab.Container defaultActiveKey="description">
                            <Nav className="flex-column">
                              <Nav.Item>
                                <Nav.Link eventKey="description">
                                  Description
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="overview">
                                  Overview
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="key_benefits">
                                  Key Benefits
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="eligibility">Eligibility</Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane
                                eventKey="description"
                                className="overview-tab"
                              >
                                <div className="course-desc">
                                  <h5>Course Description</h5>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: courseDesc,
                                    }}
                                  ></p>
                                </div>

                              </Tab.Pane>
                              <Tab.Pane
                                eventKey="overview"
                                className="curriculum-tab"
                              >
                                <div className="course-curriculum">
                                  <h5>Course Overview</h5>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: courseOverview,
                                    }}
                                  ></p>
                                </div>

                              </Tab.Pane>
                              <Tab.Pane
                                eventKey="key_benefits"
                                className="instructor-tab"
                              >
                                <h5>Course Key Benefits</h5>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: courseKeyBenefits,
                                  }}
                                ></p>

                              </Tab.Pane>
                              <Tab.Pane
                                eventKey="eligibility"
                                className="review-tab"
                              >
                                <Row>
                                  <Col md="12">
                                    {/* <div className="review-comments"> */}
                                    <h5>Course Eligibility</h5>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: courseEligibility,
                                      }}
                                    ></p>


                                  </Col>
                                </Row>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                      </div>
                    </Col>

                  </Row>
                </Container>
              </section>) : (empty ? notFound() : <Loader />)}
            </Styles>
          </div>)
      }}
    </Observer>
  );
};

export default CourseDetails;
