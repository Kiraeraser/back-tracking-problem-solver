export function solve( board){
    var execution = [];
    SolveSudoku (board, 0, 0,execution);
    return board;
    
}

function SolveSudoku (board, row, col,execution){
    
    if(row === 9){
        return true;
    }
    if(col === 9){
        return SolveSudoku(board, row+1, 0, execution);
    }
    if(board[row][col] !== 0){
        return SolveSudoku (board, row, col+1, execution);
    }
    for(var num =1; num<=9; num++){
        if(isSolvable(board, row, col, num)){
            board[row][col] = num;
            execution.push([row, col, num, 1]);
            if(SolveSudoku(board,row,col, execution)){
                return true;
            }
            board[row][col] = 0;
            execution.push([row, col, num, 0]);
            
        }
    }
    return false;
}

export function isSolvable (board, row, col, val){
    if(checkRow(board,col,val)){
        return false;
    }
    if(checkCol (board, row, val)){
        return false;
    }
    var stCol = Math.floor(col/3)*3;
    var stRow = Math.floor(row/3)*3;
    if(checkSubBoard (board, stRow, stCol,  val)){
        return false;
    }
    return true;
    
}

function checkRow (board, col, val){
    for(var row = 0 ;row< 9; row++){
        if(board[row][col] === val){
            return true;
        }
    }
    return false;
}

function checkCol (board, row, val){
    for(var col = 0 ;col< 9; col++){
        if(board[row][col] === val){
            return true;
        }
    }
    return false;
}

function checkSubBoard (board, row, col,  val){
    
    for(var r = row ; r< row+3; r++){
        for(var c= col; c<col+3;c++ ){
            if(board[r][c] === val){
                return true;
            }
        }
        
    }
    return false;
}

