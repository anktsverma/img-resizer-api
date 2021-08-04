import React, { useState, } from 'react';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import AboutUs from '../../components/AboutUs';
import TabBox from './../../components/TabBox';
import { StyleFun } from "./styles/about.js";
import { useClientStore } from '../../contextProviders/clientContext';

const About = () => {
    const clientStore = useClientStore();

    const [Styles,setStyles] = useState(StyleFun(clientStore.colors))
    
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper about-page">

                

                {/* Breadcroumb */}
                <BreadcrumbBox title="About Us" />

                {/* About Area */}
                <AboutUs />

                {/* Tab Section */}
                <TabBox />

               

            </div>
        </Styles>
    )

}

export default About