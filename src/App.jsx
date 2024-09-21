import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      let res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setData(res.data);
      setLoader(false);
    } catch (error) {
      setError(error.message);
      setLoader(false);
    }
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input !== "") {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">To-Do Search</h1>

        <form className="mb-4" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              className="form-control rounded"
              value={input}
              onChange={handleOnChange}
              placeholder="Search by task title..."
              style={{
                padding: "10px",
                borderColor: "#ced4da",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Search
            </button>
          </div>
        </form>

        {loader ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">Error: {error}</p>
        ) : (
          <div className="row">
            {filterData.length > 0
              ? filterData.map((item) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{item.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Task ID: {item.id}
                        </h6>
                        <p className="card-text">
                          Status:{" "}
                          <span
                            className={
                              item.completed ? "text-success" : "text-danger"
                            }
                          >
                            {item.completed ? "Completed" : "Not Completed"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : data.length > 0
              ? data.map((item) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{item.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Task ID: {item.id}
                        </h6>
                        <p className="card-text">
                          Status:{" "}
                          <span
                            className={
                              item.completed ? "text-success" : "text-danger"
                            }
                          >
                            {item.completed ? "Completed" : "Not Completed"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : <p className="text-center">No data available</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default App;



