import React, { useState } from "react";

function Price({ searchMinMax, searchMin, searchMax }) {

    const [min, setMin] = useState(null); 
    const [max, setMax] = useState(null);

    async function handleMax(evt) {
        evt.preventDefault();
        setMax(evt.target.value); 

        if (min) searchMinMax(min, evt.target.value); 
        else searchMax(evt.target.value || undefined);
    }

    async function handleMin(evt) {
        evt.preventDefault();
        setMin(evt.target.value);

        if(max) searchMinMax(evt.target.value, max); 
        else searchMin(evt.target.value || undefined);
    }

    return (
        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
            <div className="accordion-body">
                <div className="row mb-3">
                    <div className="col-6">
                        <p className="mb-0">
                            Min
                        </p>
                        <div className="form-outline">
                            <input type="number" id="min" className="form-control" min="1" onChange={handleMin}/>
                            <label className="form-label" htmlFor="typeNumber">$0</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <p className="mb-0">
                            Max
                        </p>
                        <div className="form-outline">
                            <input type="number" id="max" className="form-control" max="10000" onChange={handleMax}/>
                            <label className="form-label" htmlFor="typeNumber">$10,000</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Price; 