let dice = [1, 6, 6, 2, 3, 4, 6];

function is6(index) {
    return (dice[index]===6);
}

dice.forEach(function(index){
    if (is6(dice)===true) {
        console.log(dice[index], index);
    }
})




dice.forEach(function(index){
    if (dice[index]===6) {
        console.log(dice[index], index);
    }
})


