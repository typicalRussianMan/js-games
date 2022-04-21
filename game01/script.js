function createMatrix(n, m) {
    let matrix = [];

    for (let i=0; i < n; i++) {
        matrix.push([]);
        for (let j=0; j < m; j++) {
            matrix[i].push(null);
        }
    }

    return matrix;
}

Node.prototype.isEmpty = function() {
    return this.textContent == "";
}

class Table {

    constructor(table, rows, cols) {
        this.table = table;

        this.initTable(rows, cols);
    }

    initTable(rows, cols) {

        for (let i=0; i < rows; i++) {
            const row = document.createElement("TR");

            for (let j=0; j < cols; j++) {
                const cell = document.createElement("TD");

                row.append(cell);
            }

            this.table.append(row);
        }

    }

    getCellById(i, j) {
        const rw = this.table.querySelectorAll("tr")[i];
        return rw ? rw.querySelectorAll("td")[j] : null;
    }

    fillCell(i, j, color) {
        const cell = this.getCellById(i, j);
        cell ? cell.style.background = color : null;
    }

    setCellText(i, j, text) {
        const cell = this.getCellById(i, j);
        cell ? cell.textContent = text : null;
    }

    clearCells() {
        const cells = this.table.querySelectorAll("td");
        cells.forEach(el => el.style.background = "transparent");
    }

    getIdOfCell(cell) {
        const rows = this.table.querySelectorAll("tr");
        for (let i=0; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll("td");
            for (let j=0; j < cells.length; j++) {
                if (cells[j] === cell) return [i, j];
            }
        }
        return [-1, -1];
    }

    isFillCellById(i, j) {
        return this.getCellById(i, j).style.background !== "transparent";
    }

    isFillCellByElement(cell) {
        return cell.style.background !== "transparent";
    }

    

}

class Game {

    constructor(gameMap, rows, columns) {


        this.currentNum = 1;
        this.gameMatrix = createMatrix(rows, columns);
        this.gameMap = new Table(gameMap, rows, columns);
        this.currPos = null;


        gameMap.onclick = e => {
            gameMap.onclick = e => {
                this.nextStep(e);
            }

            let [i,j] = this.gameMap.getIdOfCell(e.target);
            this.gameMatrix[i][j] = this.currentNum;
            this.gameMap.setCellText(i, j, this.currentNum++)
            this.currPos = [i, j];
            this.showAvailableSteps();
        } 

    }

    showAvailableSteps() {
        const [i, j] = this.currPos;
        const fill = "#ff8921";
        if (this.gameMatrix[i-2] && this.gameMatrix[i-2][j-1] === null) this.gameMap.fillCell(i-2, j-1, fill);
        if (this.gameMatrix[i-2] && this.gameMatrix[i-2][j+1] === null) this.gameMap.fillCell(i-2, j+1, fill);
        if (this.gameMatrix[i-1] && this.gameMatrix[i-1][j-2] === null) this.gameMap.fillCell(i-1, j-2, fill);
        if (this.gameMatrix[i-1] && this.gameMatrix[i-1][j+2] === null) this.gameMap.fillCell(i-1, j+2, fill);
        if (this.gameMatrix[i+1] && this.gameMatrix[i+1][j-2] === null) this.gameMap.fillCell(i+1, j-2, fill);
        if (this.gameMatrix[i+1] && this.gameMatrix[i+1][j+2] === null) this.gameMap.fillCell(i+1, j+2, fill);
        if (this.gameMatrix[i+2] && this.gameMatrix[i+2][j-1] === null) this.gameMap.fillCell(i+2, j-1, fill);
        if (this.gameMatrix[i+2] && this.gameMatrix[i+2][j+1] === null) this.gameMap.fillCell(i+2, j+1, fill);
    }

    nextStep(e) {
        const cell = e.target;
        if (!this.gameMap.isFillCellByElement(cell)) return;

        const [i, j] = this.gameMap.getIdOfCell(cell);
        if (i === -1) return;
        
        this.currPos = [i, j];
        this.gameMatrix[i][j] = this.currentNum;
        this.gameMap.setCellText(i, j, this.currentNum++);

        this.gameMap.clearCells();
        this.showAvailableSteps();

    }



}

function main() {

    const gameMap = document.querySelector("#game-map");

    new Game(gameMap, 10, 10);

} 

window.onload = main;