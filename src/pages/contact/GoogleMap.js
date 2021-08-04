import React from 'react'
import * as api from './../../apis/api';
import { useState, useEffect } from 'react';
const GoogleMap = ({ id }) => {
    const [map, setMap] = useState("");
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setMap(data.response.mapEmbed);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (status) {
        return (
            <>
                <div className="mb-5" dangerouslySetInnerHTML={{ __html: map.replace("width=\"600\"", "width=\"100%\"") }} />
            </>
        )
    } else {
        return (<></>)
    }

}
export default GoogleMap;

// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { Styles } from './styles/contact.js';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class GoogleMap extends Component {

//     static defaultProps = {
//         center: {
//             lat: 40.696295,
//             lng: -73.997619
//         },
//         zoom: 11
//     };

//     render() {
//         return (
//             <Styles>
//                 {/* Google Map */}
//                 <div className="google-map-area">
//                     <GoogleMapReact
//                         bootstrapURLKeys={{ key: "AIzaSyATY4Rxc8jNvDpsK8ZetC7JyN4PFVYGCGM" }}
//                         defaultCenter={this.props.center}
//                         defaultZoom={this.props.zoom}
//                     >
//                         <AnyReactComponent lat={40.696295} lng={-73.997619} text="My Marker" />
//                     </GoogleMapReact>
//                 </div>
//             </Styles>
//         )
//     }
// }

// export default GoogleMap