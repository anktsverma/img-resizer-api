import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { StyleFun } from "./styles/faq.js";
import { Observer } from "mobx-react";
import { useClientStore } from "../../contextProviders/clientContext";
import { fetchFAQ } from "../../apis/api";
import { buildFaq } from "../../utility";
import PageNotFound from "../404/PageNotFound";
import Loader from "../../Loader";

const Faq = () => {
  const clientStore = useClientStore();
  const [dataArray, setDataArray] = useState([]);
  const [dataStatus, setDataStatus] = useState(false)
  const [empty, setEmpty] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    getFAQ();
  }, []);

  const getFAQ = async () => {
    const res = await fetchFAQ(clientStore.webHash);
    if (res.status === "success") {
      clientStore.faqData = buildFaq(res.response);
      setDataArray(clientStore.faqData);
      setDataStatus(true)
    }
    else setEmpty(true)
  };


  const [Styles, setStyles] = useState(StyleFun(clientStore.colors));


  const [bread, setBread] = useState(true)
  const notFound = () => {
    setBread(false)
    return <PageNotFound />
  }

  return (
    <Observer>
      {() => {
        return (
          <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper faq-page">
              {/* Header 2 */}
              {/* <HeaderTwo /> */}

              {/* Breadcroumb */}
              {bread ? (<BreadcrumbBox title="Faq" />) : null}

              {/* Faq Area */}
              {dataStatus ? (<section className="faq-area">
                <Container>
                  <Row>
                    <Col md="12">
                      <Tab.Container defaultActiveKey="general">
                        <Tab.Content>
                          <Tab.Pane eventKey="general">
                            <Row>
                              {dataArray.map((data, i) => (
                                <Col md="6" key={i}>
                                  <div className="faq-item">
                                    <div className="faq-title d-flex">
                                      <div className="title-icon">
                                        <span>Q</span>
                                      </div>
                                      <div className="title-text">
                                        <p>{data.faqTitle}</p>
                                      </div>
                                    </div>
                                    <div className="faq-desc">
                                      <p>{data.faqDesc}</p>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Tab.Pane>

                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                  </Row>
                </Container>
              </section>) : (empty ? notFound() : <Loader />)}
            </div>
          </Styles>
        );
      }}
    </Observer>
  )
};

export default Faq;
