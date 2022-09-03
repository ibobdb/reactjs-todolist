import React from "react";
import { FaTrash } from "react-icons/fa";

export default function List({ value, deleteHandlder }) {
  return (
    <div className="list">
      <a href={"/"} className="list-item" onClick={(e) => e.preventDefault()}>
        <div className="circle"></div>
        <div className="text">{value}</div>
        <div className="delete-button" onClick={deleteHandlder}>
          <FaTrash></FaTrash>
        </div>
      </a>
    </div>
  );
}
