import React, { useMemo, useEffect } from "react";
import "../../../src/index.css";
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import mmmPic from "../../assets/3m.png";
import amazonPic from "../../assets/amazon.png";
import Nav from "../Nav/Nav";
import MaterialReactTable from "material-react-table";



function App() {
  const dispatch = useDispatch();
  const results = useSelector((store) => store.rainforest);
  const [tableData, setTableData] = useState([]);
  const tableColumns = useMemo(
    () => [
      {
        accessorKey: "item_name", //access nested data with dot notation
        header: "Item Name",
      },
      {
        accessorKey: "container_name",
        header: "Container",
      },
      {
        accessorKey: "id", //normal accessorKey
        header: "ID",
      },
    ],
    []
  );

  useEffect(() => {}, []);

  return (
    <div>
      <Nav />
      <div className="text-center md:mt-[10%] mt-[18%]">
        {/* <h1>3M Best Products Finder</h1> */}
        <div className='flex text-xl'>
          Search on <img src={amazonPic} className='ml-2 pt-[9px] mr-2 align-middle w-[8%]' />
        </div>
      </div>
      <div className='w-screen bg-zinc-500'>
        <p className='text-2xl text-white text-center'>Results</p>
      </div>
    </div>
  );
}

export default App;
