import React, { Component } from 'react'
import { getDefaultBoard, solveForN} from '../algorithms/solveNQueen.js';
import { FaPlay} from 'react-icons/fa';
import Cell from './Cell';
import './NqueenScreen.css';

export default class NqueenScreen extends Component {
    constructor(){
        super();
        this.state ={
            boardSize : 0,
            defaultBoard :[],
        };
    }

    createDefaultBoard = (event) =>{
        var boardSize = +event.target.value;
        var defaultBoard = getDefaultBoard(boardSize);
        this.setState({
            boardSize,
            defaultBoard,
        });
    }

    generatePat = (execution) =>{
        for(var ex of execution){



            (function(ex){
                setTimeout(function(){
                    var row = ex[0];
                    var col = ex[1];
                    var id = `${row}-${col}`;
                    var fill = ex[2];
                    var cell = document.getElementById(id);
                    //console.log(fill);
                    if(fill === false){
                        //console.log("fill");
                        cell.classList.toggle('notSafe');
                        //cell.children[0].classList.toggle('hideQ');
                        cell.children[0].display= "none";
                        cell.classList.toggle('notSafe');
                    }
                    cell.classList.toggle('queen');
                    cell.children[0].display= "block";
                    cell.children[0].classList.toggle('hideQ');

                    }
                , 500);
            })(ex);            
        }
        return;
    }
    handleOnClick = () =>{
        
        var execution = solveForN(this.state.boardSize);
        //console.log(execution);
        this.generatePat(execution);
        return;
    }

    renderRow = row => {
        const { boardSize } = this.state;
        var rows = [];
        for(var col =0; col<boardSize; col++){
            rows.push(
                <td key = {col}><Cell id= {`${row}-${col}`}></Cell></td>
            )
        }
        return <tr key = {row}>{rows}</tr>;
    }

    renderBoard = () =>{
        const { boardSize } = this.state;
        var column =[];
        for(var row =0; row<boardSize; row++){
            column.push(this.renderRow(row));
        }
        return <tbody>{column}</tbody>;
    }
    render() {
        
        return (
            <div>
                <div className="display_board">
                    <table className="nqtable">{this.renderBoard()}</table>
                </div>

                <div className = "input_field">
                    <input className = 'inp' onKeyUp = {this.createDefaultBoard} placeholder="Enter the board size here"/>
                    <button  className = 'btn' onClick = {this.handleOnClick}  > <FaPlay> </FaPlay></button>
                </div>
                
            </div>
        )
    }
}
