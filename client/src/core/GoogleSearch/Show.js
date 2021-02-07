import React from "react";
import "../../App.css";

const Show = (props) => {
  const { results, info } = props;
  return (
    <div className="show">
      <div className="show__info">
        {info ? `Total results: ${info.totalResults}` : ""}
      </div>
      {/* <div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(props) => {
            localStorage.clear();
            this.props.history.push("/");
          }}
        >
          Signout
        </button>
      </div> */}
      {results.length > 0
        ? results.map((result) => (
            <div className="show__details">
              <div className="show__link">
                <a href={result.displayLink}>{result.displayLink}</a>
              </div>
              <div className="show__title">
                <a href={result.link}>{result.title}</a>
              </div>
              <div className="show__description">
                <p>{result.snippet}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Show;
