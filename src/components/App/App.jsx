// A small project created for an interview to find highly rated 3M products on Amazon. Styled with tailwind. What I've learned is that 3M sells A LOT of respirators and filters for them. My favorite 3M product however, is the vanilla mint toothpaste that no one else seems to make.

import { useEffect } from "react";
import "../../../src/index.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import amazonPic from "../../assets/amazon.png";
import Nav from "../Nav/Nav";

function App() {
  // To use this, make sure you npm install dotenv and create an .env file with your Rainforest API key in it.
  const apikey = process.env.REACT_APP_RAINFOREST_API_KEY;
  const dispatch = useDispatch();
  // The store variable isn't used but is there just in case we need to access the store with the original API pull.
  // const store = useSelector((store) => store.rainforest.defaultSearchItems);
  const [defaultResults, setDefaultResults] = useState([]);
  const [rawDataResults, setRawDataResults] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [dataFlag, setDataFlag] = useState(false);
  // The default search params. Can create a function to change the values to perform other searches.
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

  // This function handles our default search for grabbing data with the params above. Asynchronously grabs data then sets variables equal to that data.
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
        // This is our variable that starts out as the default search data but will change depending on filters the user picks.
        setDefaultResults(response.data.search_results);
        // This is our variable that will store the data we get from the search, it will not change.
        setOriginalData(response.data.search_results);
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  };

  // Simple function to flag if the user is viewing the raw API data or not. The function displays different information based on flags and conditions.
  const clickViewRawData = () => {
    setDataFlag(!dataFlag);
  };

  // This is the function that controls what happens when a user selects a filter option. Creates a new empty array to set the defaultResults array to after filtered data is pushed to it.
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
          newArr.push(originalData[i])
        }
      }
    }
    if (event.target.value === 'under50'){
      for (let i=0; i<originalData.length; i++){
        if ( originalData[i].price.value <= 50 || Number(originalData[i].price.name) < 50 ){
          newArr.push(originalData[i])
        }
      }
    }
    if (event.target.value === 'over50'){
      for (let i=0; i<originalData.length; i++){
        if ( originalData[i].price.value >= 50 || Number(originalData[i].price.name) < 50 ){
          newArr.push(originalData[i])
        }
      }
    }
    setDefaultResults(newArr)
  }

  // Since we don't need to pull data on page load, we can simply just throw in a scrolling reset on page load so the user starts at the top of the page.
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
          {/* If the user isn't viewing the raw data and the user has received data already, show the filter dropdown menu, otherwise show nothing */}
          {!dataFlag && rawDataResults ? (
            <div className='pt-5 flex-col align-middle pb-2'>
              <label htmlFor="filter" className='pl-[33%] md:pl-0 md:mr-2' >Filter:</label>
              <select name="filter" className='border' id="filter" defaultValue={'None'} onChange={handleDrop}>
                <option value="None" className='text-center'>None</option>
                <option value="500" className='text-center'>Over 500 ratings</option>
                <option value="under50" className='text-center'>Under $50.00</option>
                <option value="over50" className='text-center'>Over $50.00</option>
              </select>
            </div>
          ) : (
            <></>
          )}
          {/* If the user isn't viewing the raw data and the data exists, show a button to view raw data */}
          {!dataFlag && rawDataResults ? (
            <button onClick={clickViewRawData}>View Raw Data</button>
          ) : (
            <></>
          )}
          {/* If the user is viewing the raw data, show a button to go back to original search view. */}
          {dataFlag && rawDataResults ? (
            <button onClick={clickViewRawData}>Back to Search Results</button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Below this is our results div, maps through our defaultResults array and displays each item's picture, name, price, and rating. Changing the filter will cause a re-render and display items based off the filter. */}

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
        // Display raw json data from API.
        <div>{rawDataResults}</div>
      )}
    </div>
  );
}

export default App;
