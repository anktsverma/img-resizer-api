import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { StyleFun } from "./styles/stickyMenu.js";
import { RiArrowDropDownLine } from "react-icons/ri"
import { fetchDynamicButton } from "./../../apis/api";
import { useClientStore } from "./../../contextProviders/clientContext"

function StickyMenu(props) {

  const [dynamicButton, setDynamicButton] = useState({});
  const clientStore = useClientStore()
  useEffect(() => {
    getDynamicButton();
  }, [])

  const menu = clientStore.webConfig.menu;

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

  const [Styles, setStyles] = useState(StyleFun(clientStore.colors))



  useEffect(() => {
    window.addEventListener("scroll", () => {
      const stickyMenu = document.querySelector(".sticky-menu");

      if (window.scrollY > 160) {
        stickyMenu.classList.add("sticky");
      } else {
        stickyMenu.classList.remove("sticky");
      }
    });
  });

  return (
    <Styles>
      {/* Sticky Menu */}
      <section
        className="sticky-menu"
        style={{
          paddingTop: "0",
          height: "auto",
        }}
      >
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img src={props.logo} alt="" width="auto" height="auto" />
                </Link>
              </div>
            </Col>
            <Col lg="10" style={{ display: "flex" }}>
              <div
                className="menu-box d-flex justify-content-end"
                style={{ margin: "auto" }}
              >
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
                    >
                      More <RiArrowDropDownLine className="moreButton" />
                    </Link>
                    <ul className="dropdown list-unstyled">

                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/contact"}
                        >
                          Contact
                        </Link>
                      </li>
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
                  {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Pages <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/about"}
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/gallery"}
                        >
                          Gallery
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/login"}
                        >
                          Log In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/registration"}
                        >
                          Registration
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/contact"}
                        >
                          Contact
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/faq"}
                        >
                          Faq
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/404"}
                        >
                          404
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/coming-soon"}
                        >
                          Coming Soon
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Courses <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/course-grid"}
                        >
                          Course Grid
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/course-list"}
                        >
                          Course List
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/course-details"}
                        >
                          Course Details
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Instructor <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/instructor"}
                        >
                          Instructors
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/instructor-details"}
                        >
                          Instructor Details
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Event <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/events"}
                        >
                          Events
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/event-details"}
                        >
                          Event Details
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Blog <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/blog-classic"}
                        >
                          Blog Classic
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/blog-grid"}
                        >
                          Blog Grid
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/blog-details"}
                        >
                          Blog Details
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Shop <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/products"}
                        >
                          Products
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/product-details"}
                        >
                          Product Details
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/cart"}
                        >
                          Cart
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                </ul>
                {/* <div className="apply-btn">
                  <Link to={process.env.PUBLIC_URL + "/registration"}>
                    <i className="las la-clipboard-list"></i>Apply Now
                  </Link>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default StickyMenu;
