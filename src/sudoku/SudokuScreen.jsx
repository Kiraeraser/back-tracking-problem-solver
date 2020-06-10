import React, { Component } from 'react'
import Square from './Square';
import './SudokuScreen.css';
import {solve, isSolvable} from '../algorithms/solveSudoku.js';
import { FaHistory,FaPlay} from 'react-icons/fa';
 
const ROW_LENGTH =9;
const COL_LENGTH =9;

export default class SudokuScreen extends Component {
    constructor(){
        super();
        var defaultBoard  = this.defaultBoardState();
        this.state={
            boardState:defaultBoard,
            solvedBoard:defaultBoard,
            selectedRow: -1,
            selectedCol: -1,
            showInstruction:true,
        };
    }

    onCellSelect = (selectedRow,selectedCol) =>{
        this.setState({
            selectedCol,
            selectedRow,
        })
    }

    isValidEntry = (row, col, val) =>{
        var boardState = this.state.boardState;
        if(isSolvable (boardState, row, col, val)){
            return false;
        }
        return true;
    }

    onNumberEnter = (row,col,val) => {
        if(isNaN(val)){
            return;
        }
        if(this.isValidEntry(row,col,+val)){
            return;
        }
        var boardState = this.state.boardState;

        boardState[row][col] = +val;
        this.setState({
            boardState,
        });

        return;
    }

    onReset = () => {
        var boardState = this.defaultBoardState();
        var solvedBoard = this.defaultBoardState();
        this.setState({
            boardState,
            solvedBoard,
            displaySolved: false,
            selectedRow: -1,
            selectedCol: -1,
        });
    }

    defaultBoardState = () =>{
        var defaultBoard = [];

        for(var i =0;i<9;i++){
            var boardRow = [];
            for(var j =0;j<9;j++){
                boardRow.push(0);
            }
            defaultBoard.push(boardRow);
        }
        return defaultBoard;
    }

    
    
    componentDidMount = ()=>{
        var defaultBoard = this.defaultBoardState();
        this.setState({
            boardState : defaultBoard,
        });
        
    }

    renderRow = (id, type) => {
        var rows = [];
        var boardState =[];
        const { selectedRow, selectedCol } = this.state;
        if(type === "solved"){
            boardState = this.state.solvedBoard;
        }
        else{
            boardState = this.state.boardState;
        }
        for(var i =0; i<COL_LENGTH;i++){
            rows.push(<td key={i}><Square 
                row ={id} 
                col = {i} 
                onNumberEnter ={this.onNumberEnter}
                value = {boardState[id][i]}
                type = {type}
                selectedRow = {selectedRow}
                selectedCol = {selectedCol}
                onCellSelect = {this.onCellSelect}
                /></td>);
        }
        return <tr key={id}>{rows}</tr>
    }

    renderBoard = (type = "inp_board") =>{
        var cols = [];
        for( var i =0 ; i<ROW_LENGTH;i++){
            cols.push(
                this.renderRow(i, type)
            )
            
        }
        return <tbody>{cols}</tbody>;
    }

    checkIfSolvable = (boardState) =>{
        for(var row =0; row<ROW_LENGTH; row++){
            for(var col =0; col<COL_LENGTH; col++){
                const num =boardState[row][col];
                if(num!==0 && isSolvable(boardState, row, col, num)){
                    
                    return false;
                }
            }
        }
        return true;
    }

    solveSudokuBoard =() =>{
        const { boardState } = this.state;
        var solvedBoard = boardState.map((row)=> {
            return [...row];
        });
        if(this.checkIfSolvable(solvedBoard)){
            solvedBoard =solve(solvedBoard); 
            this.setState({
                solvedBoard,
                displaySolved: true,
            });
            
        }
        return;
    }

    toggleShowInstruction = () =>{
        const showInstruction = !this.state.showInstruction;
        this.setState({showInstruction});
        return;
    }
    render() {
        return (
            <>                
                <div className = "boardLayout">
                    <table>
                        {this.renderBoard()}
                    </table>
                    <table>
                        {this.renderBoard("solved")}
                    </table>
                </div>
                <div className = "buttonAlign">
                <button className ="btn" onClick={this.solveSudokuBoard}><FaPlay></FaPlay></button>
                
            
                
                <button className ="btn" onClick={this.onReset}><FaHistory></FaHistory></button>
                </div>

            </>
        )
    }
}
