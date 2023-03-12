import { useEffect, useState } from "react";
import { addToDo, getAllToDo } from "../../apis/HandleApi";
import Navbar from "../../Components/Navbar/Navbar"
import {
  CaretRightOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { Card } from "antd";

import { Link } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
const { Meta } = Card;


const { Search } = Input;
function Notes() {
  const [toDo, setToDo] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [linkcourse, setLinkCourse] = useState("")
  const [lnknotes, setLnkNotes] = useState("")
  const [saved, setSaved] = useState(false); // add a new state variable for tracking saved state
  const [searchResults, setSearchResults] = useState([]);


  const handleSave = async () => {
    await addToDo(name, desc, linkcourse, lnknotes);
    setName("");
    setDesc("");
    setLinkCourse("");
    setLnkNotes("");
    setSaved(true); // set saved state to true after adding a new todo
  };


  const handleSearch = async (value) => {
    try {
      const response = await axios.get(`http://localhost:5000/notes/search/${value}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllToDo(setToDo)
  }, [saved])

  return (
    <div>
      < Navbar />


      <div className="container">



        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto bg-white shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Contribute your Notes</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name of Notes..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md bg-gray-100 py-2 px-4 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Description of Notes..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="rounded-md bg-gray-100 py-2 px-4 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Link to the Course"
                value={linkcourse}
                onChange={(e) => setLinkCourse(e.target.value)}
                className="rounded-md bg-gray-100 py-2 px-4 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Link to Notes..."
                value={lnknotes}
                onChange={(e) => setLnkNotes(e.target.value)}
                className="rounded-md bg-gray-100 py-2 px-4 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
              onClick={handleSave}
            >
              Save
            </button>
          </div>


          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-white">Search Notes in Database</h2>
          <br></br>
            <div className="text-2xl font-bold text-white"> 
            <Search
              placeholder="Search"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleSearch}
            />
            </div>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {searchResults.map((result) => (

                  <Card
                    key={result.name}
                    style={({ width: 300 }, { padding: 0 }, { margin: 20 })}
                    actions={[
                      <Link
                        to={result.lnknotes}
                        target="_blank"
                      >
                        <DownloadOutlined />
                      </Link>,
                      <Link
                        to={result.linkcourse}
                        target="_blank"
                      >
                        <CaretRightOutlined key="Play" />
                      </Link>,
                    ]}
                    bordered={true}
                  >
                    <Meta

                      title={result.name}
                      description={result.desc}
                    />
                  </Card>
                ))}
            </div>
          </div>

          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">

            <h2 className="text-2xl font-bold text-white">All Collections</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {toDo.map((callout) => (
                <Card
                  key={callout.name}
                  style={({ width: 300 }, { padding: 0 }, { margin: 20 })}
                  actions={[
                    <Link
                      to={callout.lnknotes}
                      target="_blank"
                    >
                      <DownloadOutlined />
                    </Link>,
                    <Link
                      to={callout.linkcourse}
                      target="_blank"
                    >
                      <CaretRightOutlined key="Play" />
                    </Link>,
                  ]}
                  bordered={true}
                >
                  <Meta

                    title={callout.name}
                    description={callout.desc}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Notes