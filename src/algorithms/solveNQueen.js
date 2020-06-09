// var rowHash =[];
// var colHash =[];
// var diag1 =[];
// var diag2 =[];

// const fillHash = boardSize =>{
//     for(var i =0; i< boardSize; i++){
//         rowHash.push(false);
//         colHash.push(false);
//     }
//     for(var i =0;i<2*n;i++){
//         diag1.push(false);
//         diag2.push(false);
//     }
// }

export const getDefaultBoard = boardSize =>{
    var board = [];
    for(var i =0;i<boardSize;i++){
        var row =[];
        for(var j =0;j<boardSize ;j++){
            row.push('.');
        }
        board.push(row);
    }
    return board;
}


const isSafe = (board, row,col) =>{
    var boardSize = board.length;
    for(var r =0; r<boardSize; r++){
        if(board[r][col]==='Q'){
            return false;
        }
    }
    for(var c =0; c<boardSize; c++){
        if(board[row][c]==='Q'){
            return false;
        }
    }
    r = row;
    c =col;
    while(r>=0 && c>=0){
        if(board[r][c] === 'Q'){
            return false;
        }
        r-=1;
        c-=1;
    }
    r= row;
    c =col;
    while(r>=0 && c>=0){
        if(board[r][c] === 'Q'){
            return false;
        }
        r-=1;
        c-=1;
    }
    r = row;
    c =col;
    while(r>=0 && c<boardSize){
        if(board[r][c] === 'Q'){
            return false;
        }
        r-=1;
        c+=1;
    }
    r = row;
    c =col;
    while(r<boardSize && c>=0){
        if(board[r][c] === 'Q'){
            return false;
        }
        r+=1;
        c-=1;
    }
    r = row;
    c =col;
    while(r<boardSize && c<boardSize){
        if(board[r][c] === 'Q'){
            return false;
        }
        r+=1;
        c+=1;
    }
    return true;
}
const solve4n = (board, row, execution) =>{
    var boardSize = board.length;
    if(row === boardSize){
        return true;
    }
    for(var col =0; col< boardSize; col++){
        if(isSafe(board, row,col)){
            execution.push([row,col,true]);
            board[row][col] = 'Q';


            if(solve4n(board,row+1,execution)){
                return true;
            }
            board[row][col] = '.';
            execution.push([row,col,false]);
        }
    }
    
    return false;
}

export const solveForN = boardSize =>{
    var execution = [];
    var board = getDefaultBoard(boardSize);
    solve4n(board, 0,execution);
    return execution;
}