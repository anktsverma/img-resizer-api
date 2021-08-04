import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { StyleFun } from './styles/pageNotFound.js';
import { useClientStore } from "./../../contextProviders/clientContext"
const PageNotFound = () => {
    const clientStore = useClientStore();

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper error-page">

                {/* Header 2 */}


                {/* 404 Area */}
                <section className="error-area"
                    // style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
                    style={{ backgroundImage: `url(https://media.cntraveler.com/photos/5c64813396daf10fa54e3d71/master/w_4000,h_2648,c_limit/Saba-Island_GettyImages-sb10070113b-001.jpg)` }}>
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="error-box text-center">
                                    <h1>4<span>0</span>4</h1>
                                    <h3>Page Not Found</h3>
                                    <p>Ooops! The page you are looking for, couldn't be found.</p>
                                    <Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-home"></i>Go To Homepage</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </Styles>
    )

}

export default PageNotFound