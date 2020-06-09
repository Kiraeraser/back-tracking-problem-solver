import React, { Component } from 'react'
import './Cell.css';
import {FaChessQueen} from 'react-icons/fa';
export default class Cell extends Component {
    render() {
        const {id} = this.props;
        return (
            <div className="cell" id={id} key = {id}>
                <div className = "hideQ"><FaChessQueen></FaChessQueen></div>
            </div>
        )
    }
}
