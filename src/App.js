import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "reactstrap";
import Infinitescroll from "./components/infinitescroll";
import Paginate from "./components/paginate";

function App() {
  const [InputData, setInputData] = useState("");
  const [datas, setDatas] = useState([]);
  const [PageNum, setPageNum] = useState(1);

  // setcount(count+1)

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    // fetchData(PageNum);
  }, []);

  const fetchData = (page) => {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search?query=${InputData}&&page=${page}`
      )
      .then((res) => {
        const data1 = res.data.hits;
        setDatas((old) => [...old, ...data1]);
      });
  };
  console.log(datas);

  const searchData = () => {
    // console.log(InputData);
    fetchData(PageNum);
  };

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // let newPage = PageNum;
      // newPage++;
      setPageNum(PageNum + 1);
      fetchData(PageNum + 1);
    }
  };

  // console.log(Data);
  


    // console.log(Data);

    return (
      <div className="App">
      

    
        <Paginate />

        {/* <Infinitescroll/> */}
      </div>
    );

}

export default App;
