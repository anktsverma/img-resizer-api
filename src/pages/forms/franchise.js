import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StyleFun } from './styles/forms.js';
import { Dropdown, Button, ButtonGroup, Form } from "react-bootstrap"
import * as api from '../../apis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClientStore } from "./../../contextProviders/clientContext"


function Franchise() {

    const clientStore = useClientStore();


    const [Styles, setStyles] = useState(StyleFun(clientStore.colors));

    const [user, setuser] = useState({
        name_franchise: "",
        dlastname_franchise: "",
        dob_franchise: "",
        email_franchise: "",
        phone1_franchise: "",
        phone2_franchise: "",
        qualification_contact: "",
        status_contact: "",
        location_contact: "",
        investment_contact: "",
        enquiry_contact: "",
    })
    const [buttonState, setButtonState] = useState("Submit Now");


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
        return flag;
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        setButtonState("Submitting...")
        console.log(user);
        user.clientName = "Franchise Form"
        user.clientMail = clientStore.webDetails.email1;
        if (isValidform()) {
            api.sendFranchiseData(user)
                .then((data) => {
                    if (data.message === "Successfully Sent!") {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                        setuser({
                            name_franchise: "",
                            dlastname_franchise: "",
                            dob_franchise: "",
                            email_franchise: "",
                            phone1_franchise: "",
                            phone2_franchise: "",
                            qualification_contact: "",
                            status_contact: "",
                            location_contact: "",
                            investment_contact: "",
                            enquiry_contact: "",
                        })
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
            toast.error("Fill all the * marked fields", {
                position: "bottom-right"
            });
            setButtonState("Submit Now")
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
    const [education, setEducation] = useState("Select");
    const [current, setCurrent] = useState("Select");
    const eduArr = ["Under Graduation", "Graduation", "Post Graduation", "Others"]
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                {/* <HeaderTwo /> */}

                {/* Breadcroumb */}
                {/* <BreadcrumbBox title="Franchise Form" /> */}

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Franchise Form</h3>
                                    </div>
                                    <form id="form_registration" className="form">
                                        <Row>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_fname">First Name</label>
                                                    <input type="text" placeholder="First name" id="registration_fname" name="name_franchise" onChange={handleChange} value={user.name_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_lname">Last Name</label>
                                                    <input type="text" placeholder="Last name" id="registration_lname" name="dlastname_franchise" onChange={handleChange} value={user.dlastname_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Email Address</label>
                                                    <input type="email" placeholder="Email address" id="registration_email" name="email_franchise" onChange={handleChange} value={user.email_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_email">Date of Birth</label>
                                                    <input type="date" name="dob_franchise" onChange={handleChange} value={user.dob_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Phone 1</label>
                                                    <input type="text" placeholder="Phone 1" id="registration_phone_1" name="phone1_franchise" onChange={handleChange} value={user.phone1_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Phone 2</label>
                                                    <input type="text" placeholder="Phone 2" id="registration_phone_2" name="phone2_franchise" onChange={handleChange} value={user.phone2_franchise} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control option-menu">
                                                    <Col lg="12">

                                                        <label htmlFor="registration_email">Educational Qualification</label>
                                                    </Col>
                                                    <Col lg="12">
                                                        <Dropdown as={ButtonGroup}>
                                                            <Button variant="success">{education}</Button>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                                            <Dropdown.Menu>
                                                                {eduArr.map((el, index) => (
                                                                    <Dropdown.Item key={index} onClick={() => {
                                                                        setEducation(el);
                                                                        setuser({ ...user, "qualification_contact": el })
                                                                        console.log(el)
                                                                    }}>{el}</Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    {
                                                        education === "Others" ? (
                                                            <div className="others-text">
                                                                <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" name="qualification_contact" onChange={handleChange} value={user.qualification_contact} />
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
                                                                <Dropdown.Item onClick={() => { setCurrent("Working"); setuser({ ...user, "status_contact": "Working" }) }}>Working</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setCurrent("Self-Employed"); setuser({ ...user, "status_contact": "Self-Employed" }) }}>Self-Employed</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setCurrent("Un-Employed"); setuser({ ...user, "status_contact": "Un-Employed" }) }}>Un-Employed</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    {/* {
                                                        education === "Others" ? (
                                                            <div className="others-text">
                                                                <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" />
                                                                <span className="registration_input-msg"></span>
                                                            </div>) : null
                                                    } */}

                                                    {/* <p>{education}</p> */}
                                                </p>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Location</label>
                                                    <input type="text" placeholder="Location" id="registration_phone_2" name="location_contact" onChange={handleChange} value={user.location_contact} />
                                                    <span className="registration_input-msg"></span>
                                                </p>
                                            </Col>

                                            <Col lg="6">
                                                <p className="form-control">
                                                    <label htmlFor="registration_user">Investment Capacity</label>
                                                    <input type="text" placeholder="Investment Capacity" id="registration_phone_2" name="investment_contact" onChange={handleChange} value={user.investment_contact} />
                                                    <span className="registration_input-msg"></span>
                                                </p>

                                            </Col>
                                        </Row>
                                        <p className="form-control">
                                            <label htmlFor="registration_user">Enquiry Details</label>
                                            <textarea type="text" placeholder="Enquiry Details" id="registration_phone_2" name="enquiry_contact" onChange={handleChange} value={user.enquiry_contact} />
                                            <span className="registration_input-msg"></span>

                                        </p>
                                        {/* <p className="form-control">
                                            <label htmlFor="registration_password">Password</label>
                                            <input type="password" placeholder="*******" id="registration_password" />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="registration_cpassword">Confirm Password</label>
                                            <input type="password" placeholder="Confirm password" id="registration_cpassword" />
                                            <span className="registration_input-msg"></span>
                                        </p> */}
                                        {
                                            buttonState === "Submitting..." ? (
                                                <button className="submit" disabled={true} onClick={handleSubmission} >{buttonState}</button>
                                            ) : (
                                                <button className="submit " disabled={false} onClick={handleSubmission} >{buttonState}</button>
                                            )
                                        }



                                    </form>
                                    <ToastContainer />
                                    {/* <div className="have_account-btn text-center">
                                        <p>Already have an account? <Link to="/login">Login Here</Link></p>
                                    </div> */}
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

export default Franchise




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import HeaderTwo from '../../components/HeaderTwo';
// import { BreadcrumbBox } from '../../components/common/Breadcrumb';
// import Footer from '../../components/Footer';
// import { Styles } from './styles/forms.js';
// import { Dropdown, Button, ButtonGroup, Form } from "react-bootstrap"



// function Franchise() {
//     useEffect(() => {
//         const form = document.getElementById("form_registration");
//         const fname = document.getElementById("registration_fname");
//         const lname = document.getElementById("registration_lname");
//         const email = document.getElementById("registration_email");
//         const phone_1 = document.getElementById("registration_phone_1");
//         const phone_2 = document.getElementById("registration_phone_2");
//         const user = document.getElementById("registration_user");
//         const password = document.getElementById("registration_password");
//         const cpassword = document.getElementById("registration_cpassword");

//         form.addEventListener("submit", formSubmit);

//         function formSubmit(e) {
//             e.preventDefault();

//             const fnameValue = fname.value.trim();
//             const lnameValue = lname.value.trim();
//             const emailValue = email.value.trim();
//             const userValue = user.value.trim();
//             const passwordValue = password.value.trim();
//             const cpasswordValue = cpassword.value.trim();

//             if (fnameValue === "") {
//                 setError(fname, "First name can't be blank");
//             } else {
//                 setSuccess(fname);
//             }

//             if (lnameValue === "") {
//                 setError(lname, "Last name can't be blank");
//             } else {
//                 setSuccess(lname);
//             }

//             if (emailValue === "") {
//                 setError(email, "Email can't be blank");
//             } else if (!isEmail(emailValue)) {
//                 setError(email, "Not a valid email");
//             } else {
//                 setSuccess(email);
//             }

//             if (userValue === "") {
//                 setError(user, "User name can't be blank");
//             } else {
//                 setSuccess(user);
//             }

//             if (passwordValue === "") {
//                 setError(password, "Password can't be blank");
//             } else {
//                 setSuccess(password);
//             }

//             if (cpasswordValue === "" || passwordValue !== cpasswordValue) {
//                 setError(cpassword, "Password doesn't match");
//             } else {
//                 setSuccess(cpassword);
//             }
//         }

//         function setError(input, message) {
//             const formControl = input.parentElement;
//             const errorMsg = formControl.querySelector(".registration_input-msg");
//             formControl.className = "form-control text-left error";
//             errorMsg.innerText = message;
//         }

//         function setSuccess(input) {
//             const formControl = input.parentElement;
//             formControl.className = "form-control success";
//         }

//         function isEmail(email) {
//             return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
//         }
//     });
//     const [education, setEducation] = useState("Select");
//     const [current, setCurrent] = useState("Select");
//     const eduArr = ["Under Graduation", "Graduation", "Post Graduation", "Others"]
//     return (
//         <Styles>
//             {/* Main Wrapper */}
//             <div className="main-wrapper registration-page">

//                 {/* Header 2 */}
//                 <HeaderTwo />

//                 {/* Breadcroumb */}
//                 {/* <BreadcrumbBox title="Franchise Form" /> */}

//                 {/* Registration Area */}
//                 <section className="registration-area">
//                     <Container>
//                         <Row>
//                             <Col md="12">
//                                 <div className="registration-box">
//                                     <div className="registration-title text-center">
//                                         <h3>Franchise Form</h3>
//                                     </div>
//                                     <form id="form_registration" className="form">
//                                         <Row>
//                                             <Col lg="6">
//                                                 <p className="form-control">
//                                                     <label htmlFor="registration_fname">First Name</label>
//                                                     <input type="text" placeholder="First name" id="registration_fname" />
//                                                     <span className="registration_input-msg"></span>
//                                                 </p>
//                                             </Col>
//                                             <Col lg="6">
//                                                 <p className="form-control">
//                                                     <label htmlFor="registration_lname">Last Name</label>
//                                                     <input type="text" placeholder="Last name" id="registration_lname" />
//                                                     <span className="registration_input-msg"></span>
//                                                 </p>
//                                             </Col>
//                                             <Col lg="6">
//                                                 <p className="form-control">
//                                                     <label htmlFor="registration_email">Email Address</label>
//                                                     <input type="email" placeholder="Email address" id="registration_email" />
//                                                     <span className="registration_input-msg"></span>
//                                                 </p>
//                                             </Col>
//                                             <Col lg="6">

//                                                 <Row>
//                                                     <Col lg="6">
//                                                         <p className="form-control">
//                                                             <label htmlFor="registration_user">Phone 1</label>
//                                                             <input type="text" placeholder="Phone 1" id="registration_phone_1" />
//                                                             <span className="registration_input-msg"></span>
//                                                         </p>
//                                                     </Col>
//                                                     <Col lg="6">
//                                                         <p className="form-control">
//                                                             <label htmlFor="registration_user">Phone 2</label>
//                                                             <input type="text" placeholder="Phone 2" id="registration_phone_2" />
//                                                             <span className="registration_input-msg"></span>
//                                                         </p>

//                                                     </Col>
//                                                 </Row>
//                                             </Col>
//                                             <Col lg="6">
//                                                 <p className="form-control option-menu">
//                                                     <Col lg="12">

//                                                         <label htmlFor="registration_email">Educational Qualification</label>
//                                                     </Col>
//                                                     <Col lg="12">
//                                                         <Dropdown as={ButtonGroup}>
//                                                             <Button variant="success">{education}</Button>
//                                                             <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
//                                                             <Dropdown.Menu>
//                                                                 {eduArr.map((el, index) => (
//                                                                     <Dropdown.Item key={index} onClick={() => {
//                                                                         setEducation(el)
//                                                                         console.log(el)
//                                                                     }}>{el}</Dropdown.Item>
//                                                                 ))}
//                                                             </Dropdown.Menu>
//                                                         </Dropdown>
//                                                     </Col>
//                                                     {
//                                                         education === "Others" ? (
//                                                             <div className="others-text">
//                                                                 <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" />
//                                                                 <span className="registration_input-msg"></span>
//                                                             </div>) : null
//                                                     }

//                                                     {/* <p>{education}</p> */}
//                                                 </p>
//                                             </Col>
//                                             <Col lg="6">
//                                                 <p className="form-control option-menu">
//                                                     <Col lg="12">

//                                                         <label htmlFor="registration_email">Current Status</label>
//                                                     </Col>
//                                                     <Col lg="12">
//                                                         <Dropdown as={ButtonGroup}>
//                                                             <Button variant="success">{current}</Button>
//                                                             <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
//                                                             <Dropdown.Menu>
//                                                                 <Dropdown.Item onClick={() => { setCurrent("Working") }}>Working</Dropdown.Item>
//                                                                 <Dropdown.Item onClick={() => { setCurrent("Self-Employed") }}>Self-Employed</Dropdown.Item>
//                                                                 <Dropdown.Item onClick={() => { setCurrent("Un-Employed") }}>Un-Employed</Dropdown.Item>
//                                                             </Dropdown.Menu>
//                                                         </Dropdown>
//                                                     </Col>
//                                                     {
//                                                         education === "Others" ? (
//                                                             <div className="others-text">
//                                                                 <input type="email" placeholder="Please Enter Your Qualification" id="registration_email" />
//                                                                 <span className="registration_input-msg"></span>
//                                                             </div>) : null
//                                                     }

//                                                     {/* <p>{education}</p> */}
//                                                 </p>
//                                             </Col>
//                                             <Col lg="6">
//                                                 <p className="form-control">
//                                                     <label htmlFor="registration_user">Location</label>
//                                                     <input type="text" placeholder="Location" id="registration_phone_2" />
//                                                     <span className="registration_input-msg"></span>
//                                                 </p>
//                                             </Col>

//                                             <Col lg="6">
//                                                 <p className="form-control">
//                                                     <label htmlFor="registration_user">Investment Capacity</label>
//                                                     <input type="text" placeholder="Investment Capacity" id="registration_phone_2" />
//                                                     <span className="registration_input-msg"></span>
//                                                 </p>

//                                             </Col>
//                                         </Row>
//                                         <p className="form-control">
//                                             <label htmlFor="registration_user">Enquiry Details</label>
//                                             <textarea type="text" placeholder="Enquiry Details" id="registration_phone_2" />
//                                             <span className="registration_input-msg"></span>

//                                         </p>
//                                         {/* <p className="form-control">
//                                             <label htmlFor="registration_password">Password</label>
//                                             <input type="password" placeholder="*******" id="registration_password" />
//                                             <span className="registration_input-msg"></span>
//                                         </p>
//                                         <p className="form-control">
//                                             <label htmlFor="registration_cpassword">Confirm Password</label>
//                                             <input type="password" placeholder="Confirm password" id="registration_cpassword" />
//                                             <span className="registration_input-msg"></span>
//                                         </p> */}
//                                         <button className="submit">Submit</button>
//                                     </form>
//                                     {/* <div className="have_account-btn text-center">
//                                         <p>Already have an account? <Link to="/login">Login Here</Link></p>
//                                     </div> */}
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </section>

//                 {/* Footer 2 */}
//                 <Footer />

//             </div>
//         </Styles >
//     )
// }

// export default Franchise