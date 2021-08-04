import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StyleFun } from './styles/forms.js';
import { Dropdown, Button, ButtonGroup, Form } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from '../../apis/api';
import { useClientStore } from "./../../contextProviders/clientContext"
import { CgAsterisk } from "react-icons/cg"


function Career() {
    const clientStore = useClientStore();

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors));
    const clientName = clientStore.instituteDetails["web-title"];
    const clientEmail = clientStore.instituteDetails.Email1;
    // console.log(clientName, clientEmail)
    const [toggle, setToggle] = useState(0)

    const [selectedFile, setSelectedFile] = useState("");
    const [buttonState, setButtonState] = useState("Submit");
    const [user, setuser] = useState({
        career_fname: "",
        career_lname: "",
        career_email: "",
        career_dob: "",
        career_phone1: "",
        career_phone2: "",
        career_location: "",
        career_qualification: "",
        career_status: "",

    })
    function isValidform() {
        var flag = 1;
        for (var key in user) {
            if (user[key] === "") {
                flag = 0;
            }
        }
        if (selectedFile === "") {
            flag = 0;
        }
        return flag;
    }
    const handleChange = (e) => {

        var namee = e.target.name;
        var valuee = e.target.value;
        setuser({ ...user, [namee]: valuee });
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        setButtonState("Submitting...");
        console.log("Submit clicked");

        const formData = new FormData();
        formData.append('file', selectedFile);
        // console.log(user);
        user.clientMail = clientStore.webDetails.email1;
        user.clientName = "Career Form"
        for (var key in user) {
            formData.append(key, user[key]);
        }
        if (isValidform() === 1) {
            api.sendCareerData(formData)
                .then((data) => {
                    // console.log("data", data);
                    if (data.message === "Successfully Sent!") {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit");
                        setuser({
                            career_fname: "",
                            career_lname: "",
                            career_email: "",
                            career_dob: "",
                            career_phone1: "",
                            career_phone2: "",
                            career_location: "",
                            career_qualification: "",
                            career_status: "",
                            clientMail: clientEmail,
                            clientName: clientName
                        })
                        document.getElementById("file-up").value = ""
                        setSelectedFile("")
                    } else {
                        console.log(data.message);
                        toast.error("Form Submission Failed", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit");
                    }
                })
                .catch((err) => {
                    toast.error("Form Submission Failed", {
                        position: "bottom-right"
                    });
                    console.log(err);
                    setButtonState("Submit");
                });
        }
        else {
            toast.error("Fill all the * marked fields and upload the required documents", {
                position: "bottom-right"
            });
            setButtonState("Submit");
        }

    };


    // console.log(user);
    useEffect(() => {
        const form = document.getElementById("form_registration");
        const fname = document.getElementById("registration_fname");
        const lname = document.getElementById("registration_lname");
        const email = document.getElementById("registration_email");
        const phone_1 = document.getElementById("registration_phone_1");
        const phone_2 = document.getElementById("registration_phone_2");
        const user = document.getElementById("registration_user");
        const password = document.getElementById("registration_password");
        const cpassword = document.getElementById("registration_cpassword");

        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const fnameValue = fname.value.trim();
            const lnameValue = lname.value.trim();
            const emailValue = email.value.trim();
            const userValue = user.value.trim();
            const passwordValue = password.value.trim();
            const cpasswordValue = cpassword.value.trim();

            if (fnameValue === "") {
                setError(fname, "First name can't be blank");
            } else {
                setSuccess(fname);
            }

            if (lnameValue === "") {
                setError(lname, "Last name can't be blank");
            } else {
                setSuccess(lname);
            }

            if (emailValue === "") {
                setError(email, "Email can't be blank");
            } else if (!isEmail(emailValue)) {
                setError(email, "Not a valid email");
            } else {
                setSuccess(email);
            }

            if (userValue === "") {
                setError(user, "User name can't be blank");
            } else {
                setSuccess(user);
            }

            if (passwordValue === "") {
                setError(password, "Password can't be blank");
            } else {
                setSuccess(password);
            }

            if (cpasswordValue === "" || passwordValue !== cpasswordValue) {
                setError(cpassword, "Password doesn't match");
            } else {
                setSuccess(cpassword);
            }
        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".registration_input-msg");
            formControl.className = "form-control text-left error";
            errorMsg.innerText = message;
        }

        function setSuccess(input) {
            const formControl = input.parentElement;
            formControl.className = "form-control success";
        }

        function isEmail(email) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        }
    });
    const [education, setEducation] = useState("Select");
    const [current, setCurrent] = useState("Select");
    const eduArr = ["Under Graduation", "Graduation", "Post Graduation", "Others"]
    // console.log(selectedFile);
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                {/* <HeaderTwo /> */}

                {/* Breadcroumb */}
                {/* <BreadcrumbBox title="Career Form" /> */}

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Career Form</h3>
                                    </div>
                                    <form id="form_registration" className="form">
                                        <Row>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_fname">First Name</label>
                                                    <input type="text" placeholder="First name" id="registration_fname" name="career_fname" onChange={handleChange} value={user.career_fname} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_lname">Last Name</label>
                                                    <input type="text" placeholder="Last name" id="registration_lname" name="career_lname" onChange={handleChange} value={user.career_lname} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Email Address</label>
                                                    <input type="email" placeholder="Email address" id="registration_email" name="career_email" onChange={handleChange} value={user.career_email} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Date of Birth</label>
                                                    <input type="date" name="career_dob" onChange={handleChange} value={user.career_dob} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Phone 1</label>
                                                    <input type="text" placeholder="Phone 1" id="registration_phone_1" name="career_phone1" onChange={handleChange} value={user.career_phone1} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Phone 2</label>
                                                    <input type="text" placeholder="Phone 2" id="registration_phone_2" name="career_phone2" onChange={handleChange} value={user.career_phone2} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            {/* <Col lg="6">
                                                <Row>
                                                    <Col lg="6">
                                                        <p className="form-control">
                                                            <label htmlFor="registration_user">Phone 1</label>
                                                            <input type="text" placeholder="Phone 1" id="registration_phone_1" />
                                                            <span className="registration_input-msg"></span>
                                                        </p>
                                                    </Col>
                                                    <Col lg="6">
                                                        <p className="form-control">
                                                            <label htmlFor="registration_user">Phone 2</label>
                                                            <input type="text" placeholder="Phone 2" id="registration_phone_2" />
                                                            <span className="registration_input-msg"></span>
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Col> */}
                                            <Col lg="6">
                                                <p className="form-control option-menu">
                                                    <Col lg="12">

                                                        <label htmlFor="registration_email">Educational Qualification</label>
                                                    </Col>
                                                    <Col lg="12">
                                                        <Dropdown as={ButtonGroup} name="career_qualification" onChange={handleChange} value={user.career_qualification}>
                                                            <Button variant="success">{education}</Button>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                                            <Dropdown.Menu>
                                                                {eduArr.map((el, index) => (
                                                                    <Dropdown.Item key={index} onClick={() => {
                                                                        setEducation(el)
                                                                        setuser({ ...user, 'career_qualification': el });
                                                                        console.log(el)
                                                                    }}>{el}</Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    {
                                                        education === "Others" ? (
                                                            <div className="others-text">
                                                                <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" name="career_qualification" onChange={handleChange} value={user.career_qualification} />
                                                                <span className="registration_input-msg"></span>
                                                            </div>) : null
                                                    }

                                                    {/* <p>{education}</p> */}
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control option-menu">
                                                    <Col lg="12">

                                                        <label htmlFor="registration_email">Current Status</label>
                                                    </Col>
                                                    <Col lg="12">
                                                        <Dropdown as={ButtonGroup}>
                                                            <Button variant="success">{current}</Button>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => { setCurrent("Working"); setuser({ ...user, 'career_status': 'Working' }); }}>Working</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setCurrent("Self-Employed"); setuser({ ...user, 'career_status': 'Self-Employed' }); }}>Self-Employed</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setCurrent("Un-Employed"); setuser({ ...user, 'career_status': 'Un-Employed' }); }}>Un-Employed</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    {
                                                        current === "Others" ? (
                                                            <div className="others-text">
                                                                <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" name="career_status" onChange={handleChange} value={user.career_status} />
                                                                <span className="registration_input-msg"></span>
                                                            </div>) : null
                                                    }

                                                    {/* <p>{education}</p> */}
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Location</label>
                                                    <input type="text" placeholder="Location" id="registration_phone_2" name="career_location" onChange={handleChange} value={user.career_location} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>

                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Upload</label>
                                                    <input type="file" name="file" className="resume-upload" id="file-up" onChange={(e) => { setSelectedFile(e.target.files[0]); }} />
                                                </p>

                                            </Col>
                                        </Row>

                                        {
                                            buttonState === "Submitting..." ? (
                                                <button className="submit" disabled={true} onClick={handleSubmission} >{buttonState}</button>
                                            ) : (
                                                <button className="submit " disabled={false} onClick={handleSubmission} >{buttonState}</button>
                                            )
                                        }
                                    </form>

                                </div>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </Container>
                </section>



            </div>
        </Styles >
    )
}

export default Career