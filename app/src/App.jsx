import { useEffect, useState } from "react";
import "./App.css";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [data, setdata] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedbtn, setselectedbtn] = useState("all");

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();
        setdata(json);
        setFilteredData(json);
        setloading(false);
      } catch (error) {
        seterror("Unable to fetch data");
      }
    };
    fetchdata();
  }, []);

  const searchfood = (e) => {
    const searchvalue = e.target.value;

    if (searchvalue === "") {
      setFilteredData(null);
    }

    const searchfilter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchvalue.toLowerCase())
    );
    setFilteredData(searchfilter);
  };

  const filteredfood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setselectedbtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setselectedbtn(type);
  };

  const filterbtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading....</div>;

  return (
    <>
      <div className="maincontainer">
        <div className="topcontainer">
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchfood} placeholder="Search Food" />
          </div>
        </div>
        <div className="filtercontainer">
          {filterbtn.map((value) => (
            <button
              className={selectedbtn === value.type ? "selected" : ""}
              key={value.name}
              onClick={() => filteredfood(value.type)}
            >
              {value.name}
            </button>
          ))}
        </div>
      </div>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

