import { nanoid } from "nanoid";
import moment from "moment";

export const buildSliderObject = (obj) => {
  let object = {
    id: nanoid(),
    backgroundImage: obj.img_url,
    uniqClass: "slider-box slider-box2 text-right",
    title: obj.slider_text,
    desc: "Best University In This Region Join With Us Today",
    btnOneLink: "course-grid",
    btnTwoLink: "contact",
  };
  return object;
};

export const coreFeatureDataFormat = (obj) => {
  let arr = [];
  // console.log(obj);
  let maxlen = 0;
  for (let i = 1; i <= 4; i++) {
    let elobj = {
      id: nanoid(),
      uniqClass: "box-icon box1",
      boxIcon: obj[`feature${i}_icon`],
      title: obj[`feature${i}_title`],
      subTitle: obj[`feature${i}_detail`],
      length: obj[`feature${i}_detail`],
    };
    maxlen = maxlen < elobj.subTitle.length ? elobj.subTitle.length : maxlen;
    // console.log(elobj);
    arr.push(elobj);
    // console.log(elobj.subTitle.length, maxlen);
  }
  // arr = arr.map((el) => {
  //   let diff = maxlen - el.subTitle.length;
  //   if (diff > 0) {
  //     for (let i = 0; i < diff; i++) {
  //       el.extraWhiteSpace = el.extraWhiteSpace + "&nbsp;";
  //     }
  //   }
  //   return el;
  //   console.log(el.subTitle.length);
  // });

  return { arr, maxlen };
};

export const buildCourse = (res) => {
  let arr = [];

  for (let i = 0; i < res.length; i++) {
    let obj = {
      id: nanoid(),
      targetId: "desi",
      imgUrl:
        res[i]["course_image"] !== ""
          ? res[i]["course_image"]
          : "https://i.ibb.co/PQbvZM3/course1.jpg",
      // imgUrl: "https://i.ibb.co/PQbvZM3/course1.jpg",
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


// course_duration: "3 Months"
// course_name: "SSC CHSL (10+2)"
// course_price: "6000"
// course_slug: "SSC_CHSL_(10+2)"
// course_start_date: "2021-06-14T00:00:00.000Z"


export const buildTestimonials = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      id: nanoid(),
      testimonialTitle: res[i].title,
      testimonialDesc: res[i].desc,
      authorImg: res[i].img_url,
      // authorImg: "testimonial-1.jpg",
      authorName: `${res[i].fname} ${res[i].lname}`,
      authorTitle: "Developer",
    };
    arr.push(obj);
  }
  return arr;
};

export const buildNotification = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      id: res[i].notify_id,
      eventDate: moment.utc(res[i].date).format("DD MMM"),
      eventFullDate: moment.utc(res[i].date).format("DD MMMM YYYY"),
      eventTitle: res[i].notify_title,
      eventTime: "5:30pm - 7.00pm",
      eventLocation: "Newyork,NY.",
      eventdesc: res[i].notify_description,
      eventLink: "/event-details",
      eventImg: res[i].image !== "" ? res[i].image : "https://images.unsplash.com/photo-1614102073832-030967418971?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    };
    // console.log(obj);
    arr.push(obj);
  }
  // console.log("Arr", arr);
  return arr;
};

export const buildPackage = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      "id": nanoid(),
      "productImg": res[i].course_image !== "" ? res[i].course_image : "https://www.marketplace.org/wp-content/uploads/2021/01/Books_New-e1611252343470.jpg?fit=2879%2C1619",
      "productTitle": res[i].course_name,
      "productUrl": `/course-details/${res[i].course_slug}`,
      "courseSlug": res[i].course_slug,
      "price": res[i].course_price,
      "discount": "-30%",
      "courseStartDate": moment.utc(res[i].course_start_date).format("DD MMMM YYYY"),
      "courseDuration": res[i].course_duration
    }
    // console.log(obj);
    arr.push(obj);
  }

  // console.log(el.course_start_date)
  return arr
}




export const buildFaq = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      id: nanoid(),
      faqTitle: res[i].Question,
      faqDesc: res[i].Answer,
    };
    arr.push(obj);
  }
  return arr;
};

export const buildFaculty = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let obj = {
      id: nanoid(),
      personImage: res[i].url,
      personName: res[i].faculty_name,
      personTitle: "Teacher",
      personDetails: res[i].faculty_detail,
      socialLinks: {
        facebook: "//www.facebook.com",
        twitter: "//www.twitter.com",
        linkedin: "//www.linkedin.com",
        youtube: "//www.youtube.com",
      },
    };
    arr.push(obj);
  }
  return arr;
};

export const buildBlog = (res) => {
  let arr = [];
  for (let i = 0; i < res.length; i++) {
    let shortDes = res[i].post_description.slice(0, 100) + " ....";
    let obj = {
      id: res[i].blog_id,
      authorImg: "author.jpg",
      postImg: res[i].post_image,
      postLink: "/blog-details/" + res[i].blog_id,
      postDate: "25 Mar",
      postTitle: res[i].post_title,
      postExcerpt: res[i].post_description,
      shortDes: shortDes,
      authorLink: "/",
      commentLink: "/",
      likeLink: "/",
      authorFName: res[i].user_first_name,
      authorLName: res[i].user_last_name,
    };
    arr.push(obj);
  }
  return arr;
};

export const updateColorObj = (obj, webObj) => {
  obj.bg1 = webObj.primary
  obj.green = webObj.secondary
  obj.green2 = webObj.ternary
  obj.gr_bg = `linear-gradient(90deg, ${webObj.secondary} 0%, ${webObj.ternary} 100%)`
  obj.gr_bg2 = `linear-gradient(90deg, ${webObj.ternary} 0%, ${webObj.secondary} 100%)`
  return obj
}