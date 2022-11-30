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
        <div className='w-full grid grid-cols-3 gap-1'>
          <img src={mmmPic} className="align-middle" /> x
          <img src={amazonPic} className="align-middle" />
        </div>
      </div>
    </div>
  );
}

export default App;
