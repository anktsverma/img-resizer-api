import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StyleFun } from './styles/forms.js';
import * as api from '../../apis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCourseDetails } from "./../../apis/api";
import { useClientStore } from "./../../contextProviders/clientContext"
import { Dropdown, Button, ButtonGroup, Form } from "react-bootstrap"
import { CgAsterisk } from "react-icons/cg"

function Admission() {

    const clientStore = useClientStore();
    const [admission, setAdmission] = useState("Select");
    const [eduArr, setEduArr] = useState([])

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const res = await fetchCourseDetails(clientStore.webHash, 3);
        // console.log("All Courses", res.response);
        setEduArr([...res.response, { course_name: "Others" }]);
    };

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors));
    const [admissionFor, setAdmissionFor] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [buttonState, setButtonState] = useState("Submit Now");
    const [user, setuser] = useState({
        user_full_name: "",
        user_dob: "",
        user_email: "",
        user_address: "",
        user_city: "",
        user_district: "",
        user_state: "",
        user_country: "",
        mobile_number: "",
        qualification: "",
        previous_year_percentage: "",
        father_name: "",
        mother_name: "",
        admission_for: "",
    })
    let namee, valuee;
    const handleChange = (e) => {
        namee = e.target.name;
        valuee = e.target.value;
        setuser({ ...user, [namee]: valuee });
        // console.log(user);
    }



    function isValidform() {
        var flag = 1;
        for (var key in user) {
            if (user[key] === "") {
                flag = 0;
            }
        }

        if (selectedFiles.length < 3) {
            flag = 0;
        }
        return flag;
    }
    const changeHandler = (e) => {
        namee = e.target.name;
        valuee = e.target.files[0]
        setSelectedFiles([...selectedFiles, valuee]);
        // console.log(valuee);
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        setButtonState("Submitting...");
        const formData = new FormData();
        // console.log(user);
        user.admission_for = admissionFor
        user.clientName = "Admission Form";
        user.clientMail = clientStore.webDetails.email1;
        console.log("user", user)
        for (var selectedFile of selectedFiles) {
            formData.append('files', selectedFile);
        }
        for (var key in user) {
            formData.append(key, user[key]);
        }
        // formData.append('gender', 'male');
        console.log(formData)

        if (isValidform() === 1) {
            api.sendAdmissionData(formData)
                .then((data) => {
                    console.log("res Data", data)
                    if (data.message === "Successfully Sent!") {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                        setuser({
                            user_full_name: "",
                            user_dob: "",
                            user_email: "",
                            user_address: "",
                            user_city: "",
                            user_state: "",
                            user_district: "",
                            user_country: "",
                            mobile_number: "",
                            qualification: "",
                            previous_year_percentage: "",
                            mother_name: "",
                            father_name: "",
                        })
                        setSelectedFiles([]);
                    } else {
                        console.log(data.message, "valid data");
                        toast.error("Form Submission Failed", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                    }
                })
                .catch((err) => {
                    toast.error("Form Submission Failed", {
                        position: "bottom-right"
                    });
                    setButtonState("Submit Now");
                    console.log(err);
                });
        } else {
            toast.error("Fill all the * marked fields and accept Declaration", {
                position: "bottom-right"
            });
            setButtonState("Submit Now");
        }

    };

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
    // const [education, setEducation] = useState("Select");
    // const [current, setCurrent] = useState("Select");
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                {/* <HeaderTwo /> */}

                {/* Breadcroumb */}
                {/* <BreadcrumbBox title="Admission" /> */}

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Admission Form</h3>
                                    </div>
                                    <form id="form_registration" className="form">
                                        <Row>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_fname">Full Name <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Full Name" id="registration_fname" name="user_full_name" onChange={handleChange} value={user.user_full_name} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Upload Photo <CgAsterisk /> </label>
                                                    <input type="file" name="file0" className="resume-upload" onChange={changeHandler} />
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_lname">Father's Name <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Father's Full Name" id="registration_lname" name="father_name" onChange={handleChange} value={user.father_name} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_lname">Mother's Name <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Mother's Full Name" id="registration_lname" name="mother_name" onChange={handleChange} value={user.mother_name} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Date of Birth <CgAsterisk /> </label>
                                                    <input type="date" name="user_dob" onChange={handleChange} value={user.user_dob} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Email Address <CgAsterisk /> </label>
                                                    <input type="email" placeholder="Email address" id="registration_email" name="user_email" onChange={handleChange} value={user.user_email} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Address <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Address" id="registration_phone_1" name="user_address" onChange={handleChange} value={user.user_address} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">City <CgAsterisk /> </label>
                                                    <input type="text" placeholder="City" id="registration_phone_2" name="user_city" onChange={handleChange} value={user.user_city} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">District <CgAsterisk /> </label>
                                                    <input type="text" placeholder="District" id="registration_phone_2" name="user_district" onChange={handleChange} value={user.user_district} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">State <CgAsterisk /> </label>
                                                    <input type="text" placeholder="State" id="registration_phone_2" name="user_state" onChange={handleChange} value={user.user_state} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Country <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Country" id="registration_phone_2" name="user_country" onChange={handleChange} value={user.user_country} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Phone Number <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Phone Number" id="registration_phone_2" name="mobile_number" onChange={handleChange} value={user.mobile_number} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Qualification <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Qualification" id="registration_phone_2" name="qualification" onChange={handleChange} value={user.qualification} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Previous Year Precentage <CgAsterisk /> </label>
                                                    <input type="text" placeholder="Previous Year Precentage" id="registration_phone_2" name="previous_year_percentage" onChange={handleChange} value={user.previous_year_percentage} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>

                                            <Col lg="6">
                                                <p className="form-control option-menu">
                                                    <Col lg="12">

                                                        <label htmlFor="registration_user">Admission For <CgAsterisk /> </label>
                                                    </Col>
                                                    <Col lg="12">
                                                        <Dropdown as={ButtonGroup} name="admission_for">
                                                            <Button variant="success">{admission}</Button>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                                            <Dropdown.Menu>
                                                                {eduArr.map((el, index) => (
                                                                    <Dropdown.Item key={index} onClick={() => {
                                                                        setAdmission(el.course_name)
                                                                        setAdmissionFor(el.course_name)
                                                                        // setuser({ ...user, 'admission_for': el.course_name });
                                                                        console.log(el.course_name)
                                                                    }}>{el.course_name}</Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    {
                                                        admission === "Others" ? (
                                                            <div className="others-text">
                                                                <input type="text" placeholder="Admission For" id="registration_phone_2" name="admission_for" onChange={(e) => setAdmissionFor(e.target.value)} value={admissionFor} />
                                                                <span className="registration_input-msg"></span>
                                                            </div>) : null
                                                    }

                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Upload Documents <CgAsterisk /> </label>
                                                    <input type="file" name="file1" className="resume-upload" onChange={changeHandler} />
                                                    <input type="file" name="file2" className="resume-upload" onChange={changeHandler} />
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
                                    <ToastContainer />

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Footer 2 */}
                {/* <Footer /> */}

            </div>
        </Styles >
    )
}

export default Admission
