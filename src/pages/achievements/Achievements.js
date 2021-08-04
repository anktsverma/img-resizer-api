import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { StyleFun } from './styles/product.js';
import { fetchAchievement } from './../../apis/api'
import { useClientStore } from '../../contextProviders/clientContext';
import PageNotFound from '../404/PageNotFound';
import Loader from '../../Loader';
import { Observer } from 'mobx-react-lite';

const Achievements = () => {

    const clientStore = useClientStore();
    const [arr, setArr] = useState([]);
    const [dataStatus, setDataStatus] = useState(false)
    const [empty, setEmpty] = useState(false)
    useEffect(() => {
        getAchievements();
    }, [])

    const getAchievements = async () => {
        const res = await fetchAchievement(clientStore.webHash);
        if (res.status === "success") {
            setArr(res.response)
            setDataStatus(true)
        }
        else setEmpty(true)
    }

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

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
                        <div className="main-wrapper product-page">
                            {/* Main Wrapper */}

                            {/* Header 2 */}
                            {/* <HeaderTwo /> */}

                            {/* Breadcroumb */}
                            {bread ? <BreadcrumbBox title="Achievements" /> : null}

                            {/* Products */}
                            {dataStatus ? (<section className="product-area">
                                <Container>
                                    <Row>
                                        <Col lg="11" md="11" sm="11" xs="9" style={{ margin: "auto" }}>
                                            <Row>
                                                {
                                                    arr.map((data, i) => (
                                                        <Col lg="4" md="4" sm="6" key={i}>
                                                            <div className="product-box">
                                                                <div className="product-img">
                                                                    <img src={data.image} alt="" className="img-fluid" />
                                                                    <span className="rank"><span>Rank</span><span>{data.rank}</span></span>
                                                                </div>
                                                                <div className="product-content text-center">
                                                                    <div className="pro-title">
                                                                        <h5>{data.class} | {data.session}</h5>
                                                                        <h5>{data.name}</h5>
                                                                        <h5>Score : {data.marks} / {data.total_marks}</h5>
                                                                    </div>

                                                                    <div className="pro-price">
                                                                        <p>{data.price}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
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

export default Achievements