let dice = [1, 6, 6, 2, 3, 4, 6];

function is6() {
    return dice[index]===6
}

function compare(dice) {
    is6(dice)===true
}

function get6s(dice, compare){
    if (compare(dice)) {
        dice.forEach(dice => console.log(dice));
    }
}