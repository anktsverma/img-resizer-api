import React, { useEffect, useState } from "react";
import Datas from "../data/blog/home-blog.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { StyleFun } from "./styles/homeBlog.js";
import { useClientStore } from "./../contextProviders/clientContext";
import { Observer } from "mobx-react";
import { buildBlog } from "../utility";
import { fetchBlogs } from "./../apis/api";

const HomeBlog = () => {
  const clientStore = useClientStore();
  const [dataStatus, setDataStatus] = useState(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const [dataArray, setDataArray] = useState([]);

  const getBlogs = async () => {
    const res = await fetchBlogs(clientStore.webHash);
    if (res.status === "success") {
      clientStore.blogs = buildBlog(res.response);
      setDataArray(clientStore.blogs);
      setDataStatus(true)
    }
  };

  const [blogLen, setBlogLen] = useState(1)

  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))



  return dataStatus ? (
    <Observer>
      {() => {
        return (
          <Styles>
            {/* Blog Area */}
            <section className="home-blog-area">
              <Container>
                <Row>
                  <Col md="12">
                    <div className="sec-title text-center">
                      <h4>{Datas.secTitle}</h4>
                    </div>
                  </Col>
                  {dataArray.map((data, i) => {
                    if (i > blogLen) return null;
                    else
                      return (
                        <Col md="6" key={i}>
                          <div className="blog-post">
                            <Row>
                              <Col lg="6" md="12">
                                <div className="blog-img">
                                  <Link to={process.env.PUBLIC_URL + data.postLink}>
                                    <img
                                      src={data.postImg}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </Link>
                                </div>
                              </Col>
                              <Col lg="6" md="12">
                                <div className="blog-content">
                                  <div className="content-box">
                                    <div className="top-content d-flex">
                                      <div className="blog-date text-center">
                                        <p>{data.postDate}</p>
                                      </div>
                                      <div className="blog-title">
                                        <h6>
                                          <Link
                                            to={
                                              process.env.PUBLIC_URL + data.postLink
                                            }
                                          >
                                            {data.postTitle}
                                          </Link>
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="blog-desk">
                                      <p className="blog-p"
                                        dangerouslySetInnerHTML={{
                                          __html: data.shortDes,
                                        }}
                                      />

                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      )
                  }

                  )}
                  <Col md="12" className="text-center">
                    <div className="viewall-btn">
                      <Link to={process.env.PUBLIC_URL + "/blog-grid"}>
                        Show More
                      </Link>
                    </div>
                  </Col>
                </Row>

              </Container>
            </section>
          </Styles>
        );
      }}
    </Observer >
  ) : null;
};

export default HomeBlog;
