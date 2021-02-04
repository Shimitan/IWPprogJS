function chessboard() {
    let size = 8, string = "";
    
    for (let i = 0; i < size; i++) {
        if (i % 2 === 0) {
            string+=" ";
        }
        for (let j = 0; j < size; j++) {
            if (j % 2 === 0) {
                string += " "
            } else {
                string += "#"
            }
        }
        string += "\n"
    }
    console.log(string);
}

chessboard();