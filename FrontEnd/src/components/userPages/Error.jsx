import React from "react";

function Error() {
    return (
        <div id="app" style={{padding:"20%"}}>
            <div>403</div>
            <div className="txt">
                Forbidden<span className="blink">_</span>
            </div>
        </div>
    )
}
export default Error;