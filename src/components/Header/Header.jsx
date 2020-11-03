import React, { useState, useEffect } from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import {withRouter} from "react-router-dom"
const Header = ({history}) => {

  const [isActive, setIsActive] = useState("")

  const setActive = (name) => {
    setIsActive(name)
  }

  useEffect(() => {
    console.log(history.location.pathname)
    setIsActive(history.location.pathname)
  }, [])

  return (
    <div className="header">
      <h1 className="header__name">Visualization</h1>
      <div className="header__buttons__container">
        <Link onClick={() => setActive("/maze")} className={`header__buttons ${isActive === "/maze" ? "active" : ""}`} to="/maze">Maze</Link>
        <Link onClick={() => setActive("/")} className={`header__buttons ${isActive === "/" ? "active" : ""}`} to="/">Board</Link>
      </div>
      
    </div>
  )
}

export default withRouter(Header)
