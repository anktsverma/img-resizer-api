import styled from "styled-components";
import { colors } from "../common/element/elements.js";
// import { colorStore } from "../common/element/elements.js";
// let colors = colorStore.getColor();
export const StyleFun = (colors) => {
    const Styles = styled.div`
    .home-blog-area {
        padding: 63px 0 42px;

        .sec-title {
            button {
      font-size : 15px;
      color     : #fff;
      background: ${colors.gr_bg};
      width     : 180px;
      height    : 50px;
      border    : none;
      border-radius : 5px;
      margin-top: 50px;

      &:hover {
          background: ${colors.gr_bg2};
      }

      @media(max-width: 767px) {
          margin-top: 5px;
      }
    }
            h4 {
                color        : ${colors.black1};
                line-height  : 35px;
                font-weight  : 600;
                max-width    : 550px;
                margin       : auto;
                margin-bottom: 48px;

                @media(max-width: 575px) {
                    margin-bottom: 15px;
                    font-size: 20px;
                }
            }
        }

        .blog-post {
            margin-bottom: 30px;

            .blog-img {
                a {
                    img {
                        border-radius : 5px;

                        @media(max-width: 991px) {
                            width: 100%;
                            height: 215px;
                            border-radius: 5px 5px 0 0;
                        }

                        @media(max-width: 767px) {
                            height: 250px;
                        }

                        @media(max-width: 480px) {
                            display : none;
                        }
                    }
                }
            }

            .blog-content {
                position: relative;

                .content-box {
                    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.08);
                    padding   : 18px;
                    background: #ffffff;
                    border-radius : 5px;
                    position: absolute;
                    top     : 20px;
                    left    : -22%;
                    z-index : 1;

                    .top-content {
                        margin-bottom: 12px;

                        .blog-date {
                            p {
                                font-size  : 16px;
                                color      : #fff;
                                background : ${colors.gr_bg};
                                padding    : 8px 10px;
                                line-height: 20px;
                                border-radius : 5px;
                                font-weight : 500;
                                margin-right: 10px;
                            }
                        }

                        .blog-title {
                            h6 {
                                a {
                                    color      : ${colors.black1};
                                    font-weight: 600;
                                    display: inline-block;
                                    line-height: 23px;
                                    padding-top: 5px;

                                    &:hover {
                                        color: ${colors.green};
                                    }
                                }
                            }
                        }
                    }

                    .blog-desk {
                        p.blog-p {
                            font-size     : 14px;
                            color         : ${colors.text3};
                            border-bottom : 1px solid ${colors.border1};
                            padding-bottom: 10px;
                            margin-bottom : 10px;
                        }

                        ul {
                            li {
                                margin-right: 15px;

                                a {
                                    font-size: 12px;
                                    color    : ${colors.text3};

                                    i {
                                        font-size     : 16px;
                                        color         : ${colors.green};
                                        vertical-align: text-bottom;
                                    }

                                    &:hover {
                                        color: ${colors.green};
                                    }
                                }
                            }
                        }
                    }

                    @media(max-width: 1199px) {
                        top: 9px;
                        left: -70%;
                    }

                    @media(max-width: 991px) {
                        position : unset;
                        border-radius: 0 0 5px 5px;
                    }
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0 10px;
        }

        button {
            font-size : 15px;
            color     : #fff;
            background: ${colors.gr_bg};
            width     : 180px;
            height    : 50px;
            border    : none;
            border-radius : 5px;
            margin-top: 50px;
      
            &:hover {
                background: ${colors.gr_bg2};
            }
      
            @media(max-width: 767px) {
                margin-top: 5px;
            }
        }
        .viewall-btn {
            margin-top: 50px;
            a {
                font-size     : 15px;
                color         : #fff;
                background    : ${colors.gr_bg};
                display       : inline-block;
                width         : 200px;
                height        : 48px;
                text-transform: uppercase;
                font-weight   : 500;
                text-align    : center;
                padding       : 14px;
                border-radius : 5px;
                margin-top: 20px;

                &:hover {
                    background: ${colors.gr_bg2};
                }

                @media(max-width: 575px) {
                    font-size: 13px;
                    width: 170px;
                    height: 42px;
                    padding: 12px;
                    margin-top: 10px;
                }
            }
        }
    }

`;

    return Styles
}