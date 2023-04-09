// 디파짓에 돈을 넣는다
// 몇개의 라인에 돈을 걸건지? 얼마나 걸건지?
// 내기의 금액을 빼야지
// 슬롯 머신을 돌리기
// 만약에 유저가 이기면 -> 그들의 이긴만큼의 돈 +
// 게임다시할지? 그만둘지

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

const deposit = () => {
    
    while(true){
    const depositamount = prompt("발란스 금액: ")
    const numberDepositAmount = parseFloat(depositamount)

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("산정할 수 없는 발란스 입니다. 다시 시도해주세요")
    }else{
        return numberDepositAmount;
     }
    }

}

const lines = () => {

    while(true){
    const lines = prompt("내기를 걸 라인: ")
    const numberLines = parseInt(lines)
    if(isNaN(numberLines) || numberLines <= 0 || numberLines > 3){
        console.log("맞지 않는 내기 라인 수 입니다. 다시 입력하세요")
    }else{
        return numberLines;
    }
    }

}

const bet = () => {
    while(true){
        const bet = prompt("내기를 걸 라인당 금액을 입력하세요")
        const numbet = parseFloat(bet)

        if(isNaN(numbet) || numbet <= 0 || numbet > balance / betlines){
            console.log("진행할 수 없는 금액입니다. 다시 입력해주세요")
        }else{
            return numbet
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }

    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.Length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;

}

const balance = deposit();
const betlines = lines()
const betpriceperline = bet()

