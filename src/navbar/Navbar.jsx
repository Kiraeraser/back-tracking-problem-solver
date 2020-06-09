import React, { Component } from 'react'
import { FaInfo} from 'react-icons/fa';
import { AiFillCaretDown } from "react-icons/ai";
import Instruction from '../instructions/Instruction.jsx';
import '../instructions/Instruction.css';
import './Navbar.css';
import DropDown from './DropDown.jsx';

const KEY_VALUE = {
    sudoku : "Sudoku Solver",
    nqueen : "N-Queen Solver"
};


export default class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            selectedValue : 'sudoku',
            showDropDown : false,
            showInstruction: false,
        };
    }

    toggle = () => {
        this.setState({
            showDropDown:!this.state.showDropDown,
        });
        return;
    }

    toggleShowInstruction = () =>{
        const showInstruction = !this.state.showInstruction;
        this.setState({showInstruction});
        return;
    }

    onSelect = (value) => {
        const { onScreenChange } = this.props;
        this.setState({
            selectedValue:value,
        });
        this.toggle();
        onScreenChange(value);

        return;
    }
    render() {
        const { selectedValue, showDropDown, showInstruction } = this.state;
        return (
            <>
                {showInstruction ? <div className="instruction">
                        <Instruction showBoard={this.toggleShowInstruction} selectedValue ={selectedValue}/> 
                    </div>:
                    <div></div>
                }
                <div className="heading">
                    <div className="labelClass">
                        <div  className="dropdown" onClick={this.toggle}>
                            Choose Algorithm <AiFillCaretDown></AiFillCaretDown>
                            </div>
                            
                    </div>
                    
                    <h1 className="title">{KEY_VALUE[`${selectedValue}`]}</h1>
                    <div  className="logoOuterDiv"
                        onClick={this.toggleShowInstruction}
                    >
                        <div className="logoInnerDiv"><FaInfo /></div></div>
                
                </div>
                {showDropDown? 
                    <DropDown onSelect={this.onSelect}></DropDown> : 
                    <div></div>
                }
                
            </>
        )
    }
}
