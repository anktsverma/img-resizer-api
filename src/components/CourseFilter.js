import React, { useEffect, useState } from "react";
import Datas from "../data/course/filter.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { StyleFun } from "./styles/courseFilter.js";
import { fetchTopCourses } from "./../apis/api";
import { useClientStore } from "./../contextProviders/clientContext";
import { Observer } from "mobx-react";
import { buildCourse } from "../utility";


function CourseFilter() {
  const clientStore = useClientStore();
  const [dataArray, setDataArray] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))


  useEffect(() => {
    getTopCourses();
  }, [dataStatus]);

  const getTopCourses = async () => {
    const res = await fetchTopCourses(clientStore.webHash, 3);
    if (res.status === "success") {
      clientStore.topCourses = buildCourse(res.response);
      setDataArray(clientStore.topCourses);
      setDataStatus(true)
    }
  };

  return dataStatus ? (
    <Observer>
      {() => {
        return (
          <Styles>
            {/* Course Area */}
            <section className="course-filter">
              <Container>
                <Row>
                  <Col md="12">
                    <div className="sec-title text-center">
                      <h4>{Datas.secTitle}</h4>
                    </div>
                  </Col>
                  <Col md="12">
                    <Row className="filter-items">
                      {dataArray.map((data, i) => (
                        <Col lg="4" md="6" key={i} data-id={data.targetId}>
                          <div className="course-item">
                            <Link to={process.env.PUBLIC_URL + data.courseLink}>
                              <div
                                className="course-image"
                                style={{
                                  backgroundImage: `url(${data.imgUrl})`

                                }}
                              >
                              </div>
                            </Link>
                            <div className="course-content">
                              <h6 className="heading">
                                <Link
                                  to={process.env.PUBLIC_URL + data.courseLink}
                                >
                                  {data.courseTitle}
                                </Link>
                              </h6>
                              {dataStatus ? (
                                <p
                                  className="desc"
                                  style={{ overflow: "hidden" }}
                                  dangerouslySetInnerHTML={{
                                    __html: `${data.courseDesc.slice(0, 200)} ...`,
                                  }}
                                ></p>
                              ) : (
                                <p className="desc">{data.courseDesc}</p>
                              )}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col md="12" className="text-center">
                    <div className="viewall-btn">
                      <Link to={process.env.PUBLIC_URL + "/course-list"}>
                        View All Courses
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Styles>
        );
      }}
    </Observer>
  ) : null;
}

export default CourseFilter;
