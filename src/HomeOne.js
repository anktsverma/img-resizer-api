import React, { useEffect, useState } from "react";
import HeroSlider from "./components/HeroSlider";
import IconBox from "./components/IconBox";
import AboutUs from "./components/AboutUs";
import CourseFilter from "./components/CourseFilter";
import TestimonialSlider from "./components/TestimonialSlider";
import FaqEvent from "./components/FaqEvent";
import TeamSlider from "./components/TeamSlider";
import HomeBlog from "./components/HomeBlog";
import PackageSection from "./components/PackageSection";
import { Modal } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr"
import { fetchImagePopUp } from "./apis/api";

import { useClientStore } from "./contextProviders/clientContext"

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="modalHome"
    >     <div
      style={{
        width: "max-content",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        maxWidth: "70%",
        backgroundColor: "transparent",
      }}
    >
        <GrFormClose onClick={props.onHide} style={{ color: "#ffffff", fontSize: "250%", border: "3px solid #ffffff", borderRadius: "50%", position: "absolute", top: "-40px", right: "-40px" }} />
        <img
          src={props.imageurl}
          style={{
            maxHeight: "auto",
            width: "100%",
            margin: "auto"
          }}
          alt="" />
      </div>

    </Modal >
  );
}

const HomeOne = () => {


  const clientStore = useClientStore();
  const [modalShow, setModalShow] = useState(clientStore.showBanner);

  const [homeShow, setHomeShow] = useState(false);

  // const [imageUrl, setImageUrl] = useState("https://i.ytimg.com/vi/5LOE98vi650/maxresdefault.jpg")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    setHomeShow(true)
  }, [])

  useEffect(() => {
    imagePop();
  }, [])

  const imagePop = async () => {
    const res = await fetchImagePopUp(clientStore.webHash)
    if (res.status === "success") {
      setImageUrl(res.response[0].image)
      setModalShow(true)
    }
    else {
      setModalShow(false)
      clientStore.showBanner = false;
    }
  }

  return homeShow ? (
    <div className="main-wrapper">

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false)
          clientStore.showBanner = false;
        }}
        imageurl={imageUrl}
      />
      {clientStore.webConfig.cms_slider === 'true' ? (<HeroSlider />) : (<></>)}
      {/* Icon Box */}
      {clientStore.webConfig.cms_features === 'false' ? (<IconBox />) : (<></>)}
      {/* About Area */}
      {clientStore.webConfig.cms_institute_details === 'true' ? (<AboutUs />) : (<></>)}
      {/* Course Filter */}
      {clientStore.webConfig.cms_course === 'true' ? (<CourseFilter />) : (<></>)}
      {/* Testimonial Slider */}
      {clientStore.webConfig.cms_testimonial === 'true' ? (<TestimonialSlider />) : (<></>)}
      {/* Packages */}
      {clientStore.webConfig.cms_facilities === 'true' ? (<PackageSection />) : (<></>)}
      {/* Faq & Event Area */}
      {clientStore.webConfig.cms_course === 'true' ? (<FaqEvent />) : (<></>)}
      {/* Team Slider */}
      {clientStore.webConfig.cms_faculty_details === 'true' ? (<TeamSlider />) : (<></>)}
      {/* Blog Area */}
      {clientStore.webConfig.cms_blogs === 'true' ? (<HomeBlog />) : (<></>)}
    </div>
  ) : null;

}

export default HomeOne;
