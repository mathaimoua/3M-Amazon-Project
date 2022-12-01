import { useEffect } from "react";
import "../../../src/index.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import amazonPic from "../../assets/amazon.png";
import Nav from "../Nav/Nav";

function App() {
  const apikey = process.env.REACT_APP_RAINFOREST_API_KEY;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.rainforest.defaultSearchItems);
  const [defaultResults, setDefaultResults] = useState([]);
  const [rawDataResults, setRawDataResults] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [dataFlag, setDataFlag] = useState(false);
  const params = {
    api_key: apikey,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: "3M",
    exclude_sponsored: "true",
    sort_by: "average_review",
    currency: "usd",
    refinements: "p_89/3M",
  };

  const defaultSearch = async () => {
    await axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        // print the JSON response from Rainforest API
        setRawDataResults(JSON.stringify(response.data, 0, 2));
        dispatch({
          type: "SET_DEFAULT_SEARCH_ITEMS",
          payload: response.data.search_results,
        });
        setDefaultResults(response.data.search_results);
        setOriginalData(response.data.search_results);
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  };

  const clickViewRawData = () => {
    setDataFlag(!dataFlag);
  };

  const handleDrop = (event) => {
    let newArr = []
    if (event.target.value === 'None'){
      for (let i=0; i<originalData.length; i++){
        newArr.push(originalData[i])
      }
    }
    if (event.target.value === '500'){
      for (let i=0; i<originalData.length; i++){
        if ( originalData[i].ratings_total >= 500 ){
          console.log('pushing', originalData[i].position)
          newArr.push(originalData[i])
        }
      }
    }
    if (event.target.value === 'under50'){
      for (let i=0; i<originalData.length; i++){
        if ( originalData[i].price.value < 50 || Number(originalData[i].price.name) < 50 ){
          console.log('pushing', originalData[i].position)
          newArr.push(originalData[i])
        }
      }
    }
    setDefaultResults(newArr)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Nav />
      <div className="md:mt-[8%] lg:mt-[6%] mt-[18%] w-full">
        {/* <h1>3M Best Products Finder</h1> */}
        <div className="flex md:text-xl text-sm pl-2">
          Search for the highly rated products found on{" "}
          <img
            src={amazonPic}
            className="ml-2 md:pt-[9px] pt-[4px] w-[18%] mr-2 align-middle md:w-[8%]"
          />
        </div>
        <div className="flex justify-between">
          <button onClick={defaultSearch}>Default Search</button>
          {!dataFlag && rawDataResults ? (
            <div className='pt-5 md:flex pb-2'>
              <label htmlFor="filter" className='md:text-center' >Filters:</label>
              <select name="filter" id="filter" defaultValue={'None'} onChange={handleDrop}>
                <option value="None" className='text-center'>None</option>
                <option value="500" className='text-center'>Over 500 ratings</option>
                <option value="under50" className='text-center'>Under $50.00</option>
                <option value="over50" className='text-center'>Over $50.00</option>
              </select>
            </div>
          ) : (
            <></>
          )}
          {!dataFlag && rawDataResults ? (
            <button onClick={clickViewRawData}>View Raw Data</button>
          ) : (
            <></>
          )}
          {dataFlag && rawDataResults ? (
            <button onClick={clickViewRawData}>Back to Search Results</button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-screen bg-zinc-500 md:h-[70px] md:pt-2 md:mb-2">
        <p className="md:text-3xl text-2xl text-white text-center md:mt-[10px]">
          Results
        </p>
      </div>
      {!dataFlag ? (
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {defaultResults.map((item) => {
            return (
              <div
                key={item.title}
                className="p-2 border-[.5px] border-zinc-100"
              >
                <div
                  className="p-2 h-[50%] hover:cursor-pointer bg-zinc-200 flex"
                  onClick={() => window.open(item.link)}
                >
                  <img
                    src={item.image}
                    className="object-contain ml-auto mr-auto mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col justify-between h-[50%] pb-3 px-1">
                  <h1 className="">{item.title}</h1>
                  {item.price.name ? (
                    <h1 className="text-center mt-2">{item.price.name}</h1>
                  ) : (
                    <h1 className="text-center mt-2">
                      ${Number(item.price.value).toFixed(2)}{" "}
                    </h1>
                  )}
                  <div>
                    Rated{" "}
                    <span className="font-bold text-orange-300">
                      {item.rating}
                    </span>{" "}
                    stars from{" "}
                    <span className="font-bold">{item.ratings_total}</span>{" "}
                    reviews
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>{rawDataResults}</div>
      )}
    </div>
  );
}

export default App;
