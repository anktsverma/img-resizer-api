import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { StyleFun } from './styles/product.js';
import { useClientStore } from '../../contextProviders/clientContext';
import { fetchAlerts } from '../../apis/api';
import { AiOutlineInfoCircle } from "react-icons/ai"
import PageNotFound from '../404/PageNotFound';
import Loader from '../../Loader';
import { Observer } from 'mobx-react-lite';

const Alerts = () => {

    const clientStore = useClientStore();
    const [alerts, setAlerts] = useState([])
    const [empty, setEmpty] = useState(false)
    const [dataStatus, setDataStatus] = useState(false)
    useEffect(() => {
        getAlertsData()
    }, [])

    const getAlertsData = async () => {
        const res = await fetchAlerts(clientStore.webHash, 10);
        if (res.status === "success") {
            setAlerts(res.response)
            setDataStatus(true)
        }
        else setEmpty(true)
    }


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
                        <div className="main-wrapper product-page">
                            {bread ? <BreadcrumbBox title="Alerts" /> : null}
                            {dataStatus ? (<section className="product-area">
                                <Container>
                                    <Row>
                                        <Col lg="11" style={{ margin: "auto" }}>
                                            <Row>
                                                {
                                                    alerts.map((data, i) => (
                                                        <Col lg="6" key={i}>
                                                            <Alert key={i} className="alert-container" variant="info">
                                                                <div>
                                                                    <AiOutlineInfoCircle size="30px" />
                                                                </div>
                                                                <p>{data.message}</p>
                                                                <Alert.Link href={`${data.link}`} >Link</Alert.Link>
                                                            </Alert>



                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>) : (empty ? notFound() : <Loader />)}
                        </div>
                    </Styles>
                )
            }}
        </Observer>

    )

}

export default Alerts