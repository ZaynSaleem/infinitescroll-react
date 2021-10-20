import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "reactstrap";
import "./style.css"

export default function Paginate() {
  const [inputData, setInputData] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [datas, setDatas] = useState([]);

  const fetchdata = (page) => {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search?query=${inputData}&&page=${page}`
      )
      .then((res) => {
        const data1 = res.data.hits;
        console.log(data1);
        setDatas(data1);
      });
  };

  const next = () => {
    setPageNum(pageNum + 1);
    fetchdata(pageNum + 1);
  };
  const previous = () => {
    setPageNum(pageNum - 1);
    fetchdata(pageNum - 1);
  };
  const pagenumbers = (e) => {
    setPageNum(e);
    fetchdata(e);
  };
  const searchData = () => {
    fetchdata(pageNum);
  };
  console.log(pageNum);
  let count = 0;
  return (
    <div>
      <div className="pagination-box mt-4">
        <input
          type="text"
          onChange={(event) => setInputData(event.target.value)}
        />
        <button onClick={searchData}>search</button>
      </div>
      <Container>
        <div className="pagination-table mt-4">

        {!datas.length ? (
          <Table bordered>
            <tbody>
              <tr>No Data</tr>
            </tbody>
          </Table>
        ) : (
          <Table bordered>
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
        </div>
        <div className="pagination-buttons">

        {pageNum === 1 ? (
          <button className="previous" onClick={previous} disabled>
            Previous
          </button>
        ) : (
          <button className="previous" onClick={previous}>Previous</button>
          )}
        <button onClick={() => pagenumbers(1)}>1</button>
        <button onClick={() => pagenumbers(2)}>2</button>
        <button onClick={() => pagenumbers(3)}>3</button>
        <button onClick={() => pagenumbers(4)}>4</button>
        <button onClick={() => pagenumbers(5)}>5</button>
        <button onClick={() => pagenumbers(6)}>6</button>
        <button onClick={() => pagenumbers(7)}>7</button>
        <button onClick={() => pagenumbers(8)}>8</button>
        <button className="previous" onClick={next}>Next</button>
          </div>
      </Container>
    </div>
  );
}
