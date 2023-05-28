import React from "react";

function Intro() {

    return (
        <div className="container mb-3">
            <h1 className="text-center text-primary font-weight-bold">WELCOME TO HAPPY SHOPPING</h1>
            <div className="row gx-3">
                <main className="col-lg-9">
                    <div className="card-banner p-5 bg-primary rounded-5" style={{ height: "350px" }}>
                        <div style={{ width: "500px" }}>
                            <h2 className="text-white">
                                Great products with <br />
                                best deals
                            </h2>
                            <p className="text-white">Low price all day, everyday!.</p>
                        </div>
                    </div>
                </main>
                <aside className="col-lg-3">
                    <div className="card-banner h-100 rounded-5" style={{ backgroundColor: "#f87217" }}>
                        <div className="card-body text-center pb-5">
                            <h5 className="pt-5 text-white">Amazing Products</h5>
                            <p className="text-white">Great product everyday!. </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Intro;