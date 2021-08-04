import React, { Fragment, useEffect, useState } from "react";
import Datas from "../../../data/course/item.json";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./../../../components/Pagination";
import { Observer } from "mobx-react";
import { useClientStore } from "../../../contextProviders/clientContext";
import { fetchCourseDetails } from "./../../../apis/api";
import { nanoid } from "nanoid";

const CourseItemGrid = () => {
  const clientStore = useClientStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [dataArray, setDataArray] = useState([]);
  // useEffect(() => {
  //   setDataArray(clientStore.topCourses);
  // }, []);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const res = await fetchCourseDetails(clientStore.webHash, 3);
    console.log("All Courses", res.response);
    setDataArray(buildCourse(res.response));
  };

  const buildCourse = (res) => {
    let arr = [];

    for (let i = 0; i < res.length; i++) {
      let obj = {
        id: nanoid(),
        imgUrl: "https://i.ibb.co/PQbvZM3/course1.jpg",
        authorImg: "author.jpg",
        authorName: "John Doe",
        authorCourses: "13 Courses",
        price: "$20",
        courseSlug: res[i]["course_slug"],
        courseTitle: res[i]["course_name"],
        courseDesc: res[i]["course_detail"],
        courseLink: `/course-details/${res[i]["course_slug"]}`,
      };
      arr.push(obj);
    }
    return arr;
  };

  return (
    <Observer>
      {() => {
        return (
          <Fragment>
            {/* Course Item */}
            {dataArray.map((data, i) => (
              <Col xl="4" lg="4" md="6" key={i}>
                <div className="course-item">
                  <Link to={process.env.PUBLIC_URL + data.courseLink}>
                    <div
                      className="course-image"
                      style={{
                        backgroundImage: `url(${data.imgUrl})`,
                      }}
                    >
                      <div className="author-img d-flex">
                        <div className="img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/${data.authorImg}`
                            }
                            alt=""
                          />
                        </div>
                        <div className="title">
                          <p>{data.authorName}</p>
                          <span>{data.authorCourses}</span>
                        </div>
                      </div>
                      <div className="course-price">
                        <p>{data.price}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="course-content">
                    <h6 className="heading">
                      <Link to={process.env.PUBLIC_URL + data.courseLink}>
                        {data.courseTitle}
                      </Link>
                    </h6>
                    <p
                      className="desc"
                      dangerouslySetInnerHTML={{
                        __html: `${data.courseDesc.slice(0, 200)} ....`,
                      }}
                    ></p>
                    <div className="course-face d-flex justify-content-between">
                      <div className="duration">
                        <p>
                          <i className="las la-clock"></i>120
                        </p>
                      </div>
                      <div className="rating">
                        <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star-half-alt"></i>
                          </li>
                          <li className="list-inline-item">(4.5)</li>
                        </ul>
                      </div>
                      <div className="student">
                        <p>
                          <i className="las la-chair"></i>60
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            {/* <Col md="12" className="text-center">
              <Pagination />
            </Col> */}
          </Fragment>
        );
      }}
    </Observer>
  );
};

export default CourseItemGrid;
