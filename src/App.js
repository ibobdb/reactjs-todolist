import React, { useState, useEffect } from "react";
import "./style.scss";
import List from "./components/List";
import { FaPlus, FaTrash } from "react-icons/fa";
import BlankList from "./assets/blank-list.gif";
export default function App() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const hoursNow = today.getHours();

  const getLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem("items"));

    return items ? items : [];
  };

  const [input, setInput] = useState("");
  const [list, setList] = useState(getLocalStorage());

  const addItem = () => {
    const getList = [...list, input];
    setList(getList);
    localStorage.setItem("items", JSON.stringify(getList));
    setInput("");
  };

  const keyEvent = (evt) => {
    if (evt.key === "Enter") {
      addItem();
    }
  };

  const emptyList = () => {
    localStorage.clear();
    setList([]);
  };
  const removeItem = (index) => {
    // localStorage.removeItem("items[0]");
    const items = getLocalStorage();
    items.splice(index, 1);
    setList(items);
    localStorage.setItem("items", JSON.stringify(items));
  };
  let renderList;
  if (list.length <= 0) {
    renderList = (
      <div className="blank-item">
        <span>Ngapain ya hari ini???</span>
        <img src={BlankList} alt="" />
      </div>
    );
  } else {
    renderList = list.map((res, index) => (
      <List value={res} key={index} deleteHandlder={() => removeItem(index)} />
    ));
  }
  useEffect(() => {
    if (hoursNow === 0) {
      localStorage.clear();
    }
  }, [hoursNow]);
  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-header">
          <div className="title">
            Today list
            <span className="date">
              {today.toLocaleDateString("ID", options)}
            </span>
          </div>
          <div className="clear-item" onClick={() => emptyList()}>
            <span>Reset</span> <FaTrash></FaTrash>
          </div>
        </div>
        <div className="card-body">{renderList}</div>
        <div className="card-footer">
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(val) => setInput(val.target.value)}
            onKeyUp={keyEvent}
          />
          <button
            type="button"
            onClick={() => {
              addItem();
            }}
          >
            <FaPlus />
          </button>
        </div>
        <div className="copyright">
          <span>2022 © Boby Nugraha Pratama</span>
        </div>
      </div>
    </div>
  );
}
