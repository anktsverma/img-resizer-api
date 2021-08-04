import React from "react";
import { useClientStore } from "./contextProviders/clientContext";
const Loader = () => {
    const clientStore = useClientStore();
    return (
        <div className="loader">
            <div className="loadingio-spinner-eclipse-0owncy3yus3"><div className="ldio-8uq4s18soym">
                <div
                    style={{ boxShadow: "0 4px 0 0" + clientStore.colors.bg1 }}
                ></div>
            </div></div>
            <p>Loading ...</p>
        </div >
    )
}
export default Loader