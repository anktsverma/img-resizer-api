import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { StyleFun } from "./styles/breadcrumb.js";
import { Link } from 'react-router-dom';
import { useClientStore } from '../../contextProviders/clientContext.js';

export const BreadcrumbBox = (props) => {
    const clientStore = useClientStore();

    const [Styles,setStyles] = useState(StyleFun(clientStore.colors))

    const state = "https://images.unsplash.com/photo-1602131010835-412c62f26aaf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"



    return (
        <Styles>
            <section className="breadcrumb-area" style={{ backgroundImage: state }}>
                <Container>
                    <Row>
                        <Col md="12" className="text-center">
                            <div className="breadcrumb-box">
                                <h2 className="breadcrumb-title">{props.title}</h2>
                                <Breadcrumb>
                                    <li ><Link to={process.env.PUBLIC_URL}>Home &nbsp; </Link></li>
                                    <li className="active">/&nbsp; {props.title}</li>
                                </Breadcrumb>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )

}