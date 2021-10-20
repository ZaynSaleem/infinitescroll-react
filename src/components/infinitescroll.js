import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "reactstrap";

export default function Infinitescroll() {
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
  let count = 0;

  return (
    <div>
      <input
        type="text"
        onChange={(event) => setInputData(event.target.value)}
      />
      <button onClick={searchData}>Search</button>
      <Container>
        {!datas.length ? (
          <Table>
            <tbody>
              <tr>No Data</tr>
            </tbody>
          </Table>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Url</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => {
                // console.log(item);
                console.log();
                return (
                  <tr key={index}>
                    <td>{++count}</td>
                    <td>{item.title}</td>
                    <td>{item.url}</td>
                    <td>{item.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
