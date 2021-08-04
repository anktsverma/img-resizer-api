import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { StyleFun } from './styles/blogDetails.js';
import { useParams } from 'react-router-dom'
import { useClientStore } from '../../contextProviders/clientContext';
import { Observer } from 'mobx-react';
import { fetchBlogs } from '../../apis/api';
import PageNotFound from '../404/PageNotFound';
import Loader from '../../Loader';

const BlogDetails = () => {
    const clientStore = useClientStore();

    const [Styles, setStyles] = useState(StyleFun(clientStore.colors))
    const [dataStatus, setDataStatus] = useState(false)
    const { blogID } = useParams();
    const [blog, setblog] = useState({});
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        getBlogData();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const getBlogData = async () => {
        const res = await fetchBlogs(clientStore.webHash)
        if (res.status === "success") {
            for (let i = 0; i < res.response.length; i++) {
                if (res.response[i].blog_id == blogID) {
                    setblog(res.response[i]);
                    setDataStatus(true)
                    break;
                }
            }
        }
        else setEmpty(true)
    }
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
                        <div className="main-wrapper blog-details-page">

                            {/* Header 2 */}
                            {/* <HeaderTwo /> */}

                            {/* Breadcroumb */}
                            {bread ? <BreadcrumbBox title="Blog Details" /> : null}

                            {/* Blog Details */}
                            {dataStatus ? (<section className="blog-details-area">
                                <Container>
                                    <Row>
                                        <Col lg="11" md="11" sm="11" style={{ margin: "auto" }}>
                                            <div className="blog-details-box">
                                                <div className="blog-details-banner">
                                                    <img src={blog.post_image} alt="" className="img-fluid" />
                                                </div>
                                                <div className="heading">
                                                    <h4>{blog.post_title}</h4>
                                                </div>

                                                <div className="blog-details-desc">
                                                    <div dangerouslySetInnerHTML={{ __html: blog.post_description }} style={{
                                                        textAlign: "justify"
                                                    }}>

                                                    </div>

                                                </div>
                                            </div>
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

export default BlogDetails