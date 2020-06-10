import React, {Component} from 'react';
import './Square.css';

export default class Square extends Component {
    constructor(){
        super();
        this.state = {
            shouldColorBg :false

        }
    }

    handleOnHover= event =>{
        const { onCellSelect , row, col, type} = this.props;
        const shouldColorBg = !this.state.shouldColorBg;
        const properBoard = !shouldColorBg || type === "solved";
        this.setState({
            shouldColorBg
        });
        if(properBoard){
            onCellSelect(-1, -1);
            return;
        }
        
        onCellSelect(row, col);
    }
    handleOnChange =event =>{
        const { row, col, onNumberEnter} = this.props;
        this.setState({
            value:event.target.value,
        })
        onNumberEnter(row,col,event.target.value);

    }
    
    render(){
        const { row, col, value, type, selectedRow, selectedCol} = this.props;
        const key = `${type}-${row}-${col}`;


        var valueToShow ="";
        var bgClass ="";
        const disable = type==="solved";
        if(value!==0){
            valueToShow = String(value);

        }
        let addBottom = 'none';
        let addRight = 'none';
        if(row === 2 || row === 5 ){
            addBottom = '5px solid black';
        }
        if(col === 2 || col === 5 ){
            addRight = '5px solid black';
        }
        if(!disable &&
            ((row === selectedRow || col === selectedCol) || 
        ( ( Math.floor(row/3) === Math.floor(selectedRow/3) )&&
        (Math.floor(col/3) === Math.floor(selectedCol/3))   ) || 
        this.state.shouldColorBg)
        ){
            bgClass = "selected"
        }
        
        
        return (
            <input className={`square ${bgClass}`} 
            key ={key}
            id = {key}
            onChange={this.handleOnChange}
            size="1"
            style = {{
                borderBottom: addBottom, borderRight: addRight,
            }}
            maxLength="1"
            value = {valueToShow}
            disabled = {disable}
            onMouseEnter = {this.handleOnHover}
            //onClick = {this.handleOnHover}
            onMouseLeave = {this.handleOnHover}
            >
          
        </input>
        )

    }
    
}
