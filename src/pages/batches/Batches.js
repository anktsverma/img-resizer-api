import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { StyleFun } from './styles/product.js';
import { fetchBatch } from '../../apis/api'
import { useClientStore } from '../../contextProviders/clientContext';
import PageNotFound from '../404/PageNotFound';
import Loader from '../../Loader';
import { Observer } from 'mobx-react-lite';

const Batches = () => {

    const clientStore = useClientStore();
    const [arr, setArr] = useState([]);
    const [dataStatus, setDataStatus] = useState(false)
    const [empty, setEmpty] = useState(false)
    useEffect(() => {
        getBatches();
    }, [])

    const getBatches = async () => {
        const res = await fetchBatch(clientStore.webHash);
        // const res = await fetchBatch("aebf83c97b89222ae69469ee94fda40e");
        if (res.status === "success") {
            setArr(res.response)
            setDataStatus(true)
        }
        else if (res.status === "failed") {
            setEmpty(true)
        }
    }

    const [bread, setBread] = useState(true)
    const notFound = () => {
        setBread(false)
        return <PageNotFound />
    }

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors));

    return (
        <Observer>
            {() => {
                return (
                    < div className="main-wrapper product-page" >
                        {/* Main Wrapper */}

                        {/* Header 2 */}
                        {/* <HeaderTwo /> */}

                        {/* Breadcroumb */}
                        {bread ? (<BreadcrumbBox title="Batches" />) : null}

                        {/* Products */}
                        <Styles>
                            {dataStatus ? (<section className="product-area">
                                <Container>
                                    <Row>
                                        <Col lg="11" md="11" sm="11" xs="9" style={{ margin: "auto" }}>
                                            <Row>
                                                <Col>
                                                    <Table striped bordered hover size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th>S No.</th>
                                                                <th>Batch Name</th>
                                                                <th>Batch Timing</th>
                                                                <th>Subject</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {arr.map((el, i) => (

                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{el.batch_name}</td>
                                                                    <td>{el.batch_timing}</td>
                                                                    <td>{el.batch_subject}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </Col>


                                    </Row>
                                </Container>
                            </section>) : (empty ? notFound() : <Loader />)}
                        </Styles>
                    </div >
                )
            }}
        </Observer>

    )

}

export default Batches