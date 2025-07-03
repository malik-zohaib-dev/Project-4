import { BASE_URL } from "../../App";
import "./SearchResult.css";

const SearchResult = ({ data }) => {
  return (
    <div className="foodcardcontainer">
      <div className="maincontainer">
      <div className="foodcards">
        {data?.map(({name,image, text, price}) => (
          <div className="foodcard" key={name}>
            <div className="foodimage">
              <img src={BASE_URL + image}></img>
            </div>
            <div className="foodinfo">
              <div className="info">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            <button>${price.toFixed(2)}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SearchResult;