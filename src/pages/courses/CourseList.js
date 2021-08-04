import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import CourseItemList from './components/CourseItemsList';
import { StyleFun } from './styles/course.js';
import { useClientStore } from '../../contextProviders/clientContext';
import PageNotFound from '../404/PageNotFound';
import { Observer } from 'mobx-react-lite';

const CourseList = () => {

    const clientStore = useClientStore();
    const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

    return (<Observer>
        {() => {

            return (!clientStore.hideCourseList.list ? (
                <div className="main-wrapper course-page">


                    {clientStore.hideCourseList.bread ? (<BreadcrumbBox title="Courses" />) : null}

                    <Styles>

                        <section className="course-list-area">
                            <Container>
                                <Row>

                                    <Col lg="9" md="8" sm="7" style={{ margin: "auto" }}>
                                        <div className="course-items2">
                                            <Row>
                                                <CourseItemList />
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </Styles>
                </div>
            ) : <PageNotFound />)
        }}
    </Observer>)

}

export default CourseList