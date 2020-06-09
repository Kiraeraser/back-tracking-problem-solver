import React, { Component } from 'react'
import Navbar from './navbar/Navbar';
import SudokuScreen from './sudoku/SudokuScreen';
import  NqueenScreen  from './n-queen/NqueenScreen';
 
export default class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            screen : "sudoku"
        };
    }

    onScreenChange = (screen) =>{
        this.setState({
            screen
        });
        return;
    }
    render() {
        const {screen } = this.state;
        const showSudoku = screen === "sudoku";
        return (
            <div>
                <Navbar onScreenChange= {this.onScreenChange}></Navbar>
                {showSudoku ? <SudokuScreen></SudokuScreen> : <NqueenScreen></NqueenScreen>}
            </div>
        )
    }
}
