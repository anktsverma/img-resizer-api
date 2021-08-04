const createClientStore = () => {
  return {
    domain: "site35.mycareerlift.com",
    // domain: "",
    webHash: "",
    // webHash: "81c318711abc5110e0fbd3d374e9103c",
    expiryDate: "",
    sliderData: [],
    coreFeaturesData: [],
    instituteDetails: {},
    topCourses: [],
    testimonials: [],
    faqData: [],
    notifications: [],
    facultyData: [],
    blogs: [],
    allCourses: [],
    webDetails: {},
    webConfig: {},
    webLayout: {},
    logo: "",
    colors: {
      bg1: "#182B49",
      bg2: "#F6F9FF",
      bg3: "#11B67A",
      gr_bg: "linear-gradient(90deg, #11B67A 0%, #009444 100%)",
      gr_bg2: "linear-gradient(90deg, #009444 0%, #11B67A 100%)",
      copy_bg: "#122340",
      blue: "#2c97ea",
      green: "#11B67A",
      green2: "#00a76a",
      red: "#ff6f6f",
      purple: "#84479c",
      yellow: "#fbab19",
      black1: "#182B49",
      black2: "#444444",
      text1: "#555555",
      text2: "#666666",
      text3: "#969696",
      text4: "#aaaaaa",
      text5: "#ffffff",
      border1: "#eeeeee",
      border2: "#3e3e3e",
      border3: "#dddddd",
      footer1: "#1a1b25",
      footer2: "#16171f",
      ftext: "#8D8E92",
      white: "#ffffff"
    },
    updateColors(obj) {
      this.colors.bg1 = obj.primary
      this.colors.green = obj.secondary
      this.colors.green2 = obj.ternary
      this.colors.gr_bg = `linear-gradient(90deg, ${obj.secondary} 0%, ${obj.ternary} 100%)`
      this.colors.gr_bg2 = `linear-gradient(90deg, ${obj.ternary} 0%, ${obj.secondary} 100%)`
      return this.colors
    },
    showBanner: false,
    hideCourseList: { list: false, bread: false }

  };
};

export default createClientStore;
