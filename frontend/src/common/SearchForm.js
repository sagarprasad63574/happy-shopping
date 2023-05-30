import React, { useState } from "react";
// import "./SearchForm.css";

function SearchForm({ searchFor }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="mb-3">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1 mx-lg-3"
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    <i className="bi bi-search"></i> Search
                </button>
            </form>
        </div>
    );
}

export default SearchForm;