import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import GoogleMap from './GoogleMap';
import { StyleFun } from './styles/contact.js';
import { useClientStore } from '../../contextProviders/clientContext';
import { fetchInstituteDetails, fetchStatus, sendContactData } from "./../../apis/api"
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoLocation } from "react-icons/go"

function Contact() {

    const clientStore = useClientStore();
    // const clientName = clientStore.instituteDetails["web-title"];
    // const clientEmail = clientStore.instituteDetails.Email1;
    // console.log(clientName, clientEmail)
    const [formData, updateFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact_no: "",
        your_query: "",
        queryType: ""
    });
    const [buttonState, setButtonState] = useState("Submit Now");
    const [queryType, setQueryType] = useState("")

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
        // console.log(formData);
    };


    const [instDetail, setInstDetail] = useState({});

    const [config, setConfig] = useState({});
    const [configStatus, setConfigStatus] = useState(false);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    const [queryArr, setQueryArr] = useState([])
    useEffect(() => {
        fetchInstituteDetails(clientStore.webHash)
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        fetchStatus(clientStore.webHash)
            .then((data) => {
                if (data) {
                    setConfig(data.config);
                    setConfigStatus(true);
                }
            }).catch((err) => {
                console.log(err);
            });
        let arr = ["Complaint", "Suggestion", "Feedback"]
        setQueryArr(arr)

    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function isValidform() {
        var flag = 1;
        for (var key in formData) {
            if (formData[key] === "") {
                flag = 0;
            }
        }
        if (queryType === "") {
            flag = 0;
        }
        console.log("flag --> ", flag)
        return flag;
    }

    const handleSubmit = (e) => {
        setButtonState("Submitting...")
        e.preventDefault();
        const data = new FormData();
        for (var key in formData) {
            data.append(key, formData[key]);
        }
        formData.queryType = queryType;
        console.log("submit handle", formData);


        if (isValidform() === 1) {
            sendContactData(clientStore.webHash, formData)
                .then((data) => {
                    console.log("data", data);
                    if (data.flag === 1) {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                    } else {
                        console.log(data);
                        toast.error("Form Submission Failed", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now")
                    }
                })
                .catch((err) => {
                    toast.error("Form Submission Failed", {
                        position: "bottom-right",
                    });
                    console.log(err);
                    setButtonState("Submit Now")
                });
        } else {
            toast.error("Fill all the Required Fields", {
                position: "bottom-right"
            });
            setButtonState("Submit Now")
        }

    };






    const [Styles, setStyles] = useState(StyleFun(clientStore.colors));





    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper contact-page">

                {/* Header 2 */}
                {/* <HeaderTwo /> */}

                {/* Breadcroumb */}
                <BreadcrumbBox title="Contact Us" />

                {/* Contact Area */}
                <section className="contact-area">
                    <Container>
                        <Row>
                            <Col md="4">
                                <div className="contact-box-title">
                                    <h4>Contact Info</h4>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-map-marker"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>Our Location</h5>
                                        <p>
                                            <span >
                                                1) {instDetail.Address1}
                                            </span>
                                            <br />
                                            <span>
                                                2) {instDetail.Address2}
                                            </span>
                                        </p>
                                        {/* <p>{instDetail.Address2}</p> */}
                                    </div>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-envelope-open"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>Email Address</h5>
                                        <p>1) {instDetail.Email1}<br />2) {instDetail.Email2}</p>
                                    </div>
                                </div>
                                <div className="contact-icon-box d-flex">
                                    <div className="icon">
                                        <i className="las la-phone"></i>
                                    </div>
                                    <div className="box-content">
                                        <h5>Phone Number</h5>
                                        <p>1) {instDetail.Contact1}<br />2) {instDetail.Contact2}</p>
                                    </div>
                                </div>

                            </Col>
                            <Col md="8">
                                <div className="contact-form">
                                    <div className="form-title">
                                        <h4>Get In Touch</h4>
                                    </div>
                                    <div className="form-box">
                                        <form id="form_contact" className="form">
                                            <Row>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="text" placeholder="First Name" id="contact_name" name="first_name" onChange={handleChange} value={formData.first_name} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="text" placeholder="Last Name" id="contact_name" name="last_name" onChange={handleChange} value={formData.last_name} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="email" placeholder="Email Address" id="contact_email" name="email" onChange={handleChange} value={formData.email} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="6">
                                                    <p className="form-control">
                                                        <input type="text" placeholder="Mobile No." id="contact_subject" name="contact_no" onChange={handleChange} value={formData.contact_no} />
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="4">
                                                    <p className="form-control" id="contact_query">
                                                        <DropdownButton id="dropdown-basic-button" title={queryType === "" ? "Query Type" : queryType}>
                                                            {queryArr.map((el, index) => (
                                                                <Dropdown.Item key={index} onClick={() => {
                                                                    setQueryType(el)
                                                                    // console.log(el)
                                                                }}>{el}</Dropdown.Item>
                                                            ))}
                                                        </DropdownButton>
                                                    </p>
                                                </Col>
                                                <Col md="12">
                                                    <p className="form-control">
                                                        <textarea name="message" id="contact_message" placeholder="Enter Message" name="your_query" onChange={handleChange} value={formData.your_query}></textarea>
                                                        <span className="contact_input-msg"></span>
                                                    </p>
                                                </Col>
                                                <Col md="12">
                                                    <Col lg="6" style={{ margin: "auto" }}>
                                                        <button onClick={handleSubmit} >{buttonState}</button>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </form>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    {/* Google Map */}
                    <GoogleMap id={clientStore.webHash} />
                </section>



            </div>
        </Styles>
    )
}

export default Contact