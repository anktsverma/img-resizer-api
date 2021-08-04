import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackToTop from './common/BackToTop';
import { StyleFun } from "./styles/footerOne.js";
import { fetchWebData } from '../apis/api';
import { useClientStore } from '../contextProviders/clientContext';
import { IoIosArrowForward } from "react-icons/io"
import { FiMapPin } from "react-icons/fi"
import { BiEnvelope, BiPhone } from "react-icons/bi"
import { Observer } from 'mobx-react-lite';
import speedLogo from "./../speedlogo.png"

const Footer = () => {
    const clientStore = useClientStore();
    const [Styles, setStyles] = useState(StyleFun(clientStore.colors))
    const [webConfig, setWebConfig] = useState({});
    const [webDetail, setWebDetail] = useState({});
    useEffect(() => {
        fetchWebData(clientStore.webHash)
            .then((data) => {
                setWebDetail(data.detail);
                setWebConfig(data.config);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Observer>
            {() => {
                return (
                    <Styles>
                        {/* Footer Area */}
                        <footer className="footer1" >
                            <a href={"https://wa.me/91" + webDetail.contact1} className="whatsapp_float" target="_blank"> <i style={{ color: "white" }} className="fab fa-whatsapp whatsapp-icon"></i></a>

                            <Container>
                                <Row>
                                    <Col md="6">
                                        <div className="footer-logo-info">
                                            <img src={webDetail.footer_logo} alt="" className="img-fluid" />
                                            {webConfig.site_map === 'Y' ? (
                                                <p style={{ fontSize: "2.2em", fontWeight: "500", color: "#eeeeee" }} className="footer-text">{webDetail.institute_name}</p>
                                            ) : (null)}
                                            <p className="footer-text" dangerouslySetInnerHTML={{ __html: webDetail.footer_text }} />
                                            <ul className="list-unstyled">
                                                <li><FiMapPin /> {webDetail.address1}</li>
                                                <li><FiMapPin /> {webDetail.address2}</li>
                                                <li><BiEnvelope /> {webDetail.email1}</li>
                                                <li><BiEnvelope /> {webDetail.email2}</li>
                                                <li><BiPhone /> {webDetail.contact1}</li>
                                                <li><BiPhone /> {webDetail.contact2}</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="f-links">
                                            <h5>Useful Links</h5>
                                            <Row className="useful-links">

                                                <Col>

                                                    <ul className="list-unstyled">
                                                        {webConfig.menu && webConfig.menu[9] == 'Y' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/blog-grid"}><IoIosArrowForward />Blogs</Link></li>
                                                        ) : (null)}
                                                        {webConfig.menu && webConfig.menu[6] == 'Y' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/career"}><IoIosArrowForward />Careers</Link></li>
                                                        ) : (null)}
                                                        {webConfig.menu && webConfig.menu[8] == 'Y' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/franchise"}><IoIosArrowForward />Franchise</Link></li>
                                                        ) : (null)}
                                                        <li><a href={"https://www.speedlabs.in"} target="blank"><IoIosArrowForward />SpeedLabs</a></li>
                                                        <li><Link to={process.env.PUBLIC_URL + "/achievements"}><IoIosArrowForward />Achievements</Link></li>
                                                    </ul>
                                                </Col>
                                                <Col>

                                                    <ul className="list-unstyled">
                                                        <li><Link to={process.env.PUBLIC_URL + "/faq"}><IoIosArrowForward />FAQs</Link></li>
                                                        <li><Link to={process.env.PUBLIC_URL + "/admission"}><IoIosArrowForward />Admission</Link></li>
                                                        {webConfig.cms_batch === 'true' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/batches"}><IoIosArrowForward />Batches</Link></li>
                                                        ) : (null)}
                                                        {webConfig.cms_alerts === 'true' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/alerts"}><IoIosArrowForward />Alerts</Link></li>
                                                        ) : (null)}
                                                        {webConfig.menu && webConfig.menu[11] == 'Y' ? (
                                                            <li><Link to={process.env.PUBLIC_URL + "/contact"}><IoIosArrowForward />Contact Us</Link></li>
                                                        ) : (null)}

                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>

                                </Row>
                            </Container>
                        </footer>

                        {/* Copyright Area */}
                        <section className="copyright-area">
                            <Container>
                                <Row>
                                    <Col md="6">
                                        <div className="copy-text">
                                            <p>Copyright &copy; 2021 <Link to={process.env.PUBLIC_URL + "/"} >{webDetail.institute_name}</Link> All rights reserved</p>
                                        </div>
                                    </Col>
                                    <Col md="6" className="text-right">
                                        <ul className="social list-unstyled list-inline">
                                            {webConfig.social && webConfig.social[0] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.facebook}><i className="fab fa-facebook-f"></i></a></li>) : (null)}
                                            {webConfig.social && webConfig.social[1] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.twitter}><i className="fab fa-twitter"></i></a></li>) : (null)}
                                            {webConfig.social && webConfig.social[2] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.linkedin}><i className="fab fa-linkedin-in"></i></a></li>) : (null)}
                                            {webConfig.social && webConfig.social[3] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.instagram}><i className="fab fa-instagram"></i></a></li>) : (null)}
                                            {webConfig.social && webConfig.social[4] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.youtube}><i className="fab fa-youtube"></i></a></li>) : (null)}
                                            {webConfig.social && webConfig.social[5] == 'Y' ? (<li className="list-inline-item"><a target="_blank" href={webDetail.app_url}><i className="fab fa-google-play"></i></a></li>) : (null)}

                                        </ul>
                                    </Col>
                                </Row>
                            </Container>

                            {/* Back To Top */}
                            {/* <BackToTop /> */}
                        </section>
                    </Styles>
                )
            }}
        </Observer>

    )

}

export default Footer
