import React, { Component } from 'react'
import './DropDown.css';

export default class DropDown extends Component {
    constructor(){
        super();
        this.state = {
            value:"sudoku"
        };
    }

    handleOnClick = () =>{
        const {onSelect} = this.props;
        onSelect(this.state.value);
        return;
    }
    render() {
        
        return (
            <div className="OutterBox">
                <div className= "option" key="1"
                onMouseDown = {()=>{
                    this.setState({
                        value : "sudoku"
                    })
                }}
                onClick = {this.handleOnClick}
                >Sudoku Solver</div>
                <div className= "option" key="2"
                onMouseDown = {()=>{
                    this.setState({
                        value : "nqueen"
                    })
                }}
                onClick = {this.handleOnClick}
                >N-Queen Solver</div>
            </div>
        )
    }
}
