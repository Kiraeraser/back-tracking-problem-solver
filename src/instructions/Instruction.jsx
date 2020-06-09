import React, { Component } from 'react'
import './Instruction.css';
import { FaRegThumbsUp,FaHistory,FaPlay } from 'react-icons/fa';
export default class Instruction extends Component {
    renderSudokuInstructions =()=>{
        return<ol>
                    <li>Left board represents the input <br/>Right board represent the output</li>
                    <li>Enter the numbers in the left board</li>
                    <li>Number range should be 1-9</li>
                    <li>Click on <FaPlay></FaPlay> to get the result on the right side</li>
                    <li>To restart click on <FaHistory></FaHistory></li>
                </ol>
                ;
        
    }

    renderNQInstructions =()=>{
        return<ol>
                    <li>Enter the board size in the input box</li>
                    <li>Click on <FaPlay></FaPlay> to get the result on the right side</li>
                </ol>
                ;
        
    }


    render() {
        const { selectedValue } = this.props;
        const showSudoku = selectedValue==="sudoku";
        return (
            <div className="modal">
                <h1>Instructions</h1>
                <div className="liDivOuter">
                    {showSudoku ? this.renderSudokuInstructions() : this.renderNQInstructions()}
                </div>
                <div className="outerDiv">
                <div className = "okButton" onClick={this.props.showBoard}> <FaRegThumbsUp></FaRegThumbsUp></div>
                </div>
                
            </div>
        )
    }
}
