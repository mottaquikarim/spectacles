/* 
 * FILENAME:    prompt.js
 * DESC:        write any starter code required here 
 */
    
    
function generateRandomNumberFromRange(s, e) {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

/*
    @func generateTrafficLight
    @returns {string}
    @desc - generates a random number from 1 to 3
            if 1, return 'red'
            if 2, return 'green',
            if 3, return 'blue'
            
    @example generateTrafficLight(); // 'red' or 'blue' or 'green'
*/

function generateTrafficLight() {
    const num = generateRandomNumberFromRange(1,3);
    switch (num) {
        case 1: 
            return 'red';
        case 2:
            return 'green';
        case 3: 
            return 'blue';
    }
}

/*
    @func generateRandomPhoneNumber
    @returns {string}
    @desc - generates a random phone number of the form
            1-718-786-2825
            
    @example generateRandomPhoneNumber(); // "1-718-786-2825"
*/


function generateRandomNumber(len) { // generates a random number len characters long
    let repeat = 0;
    let output = '';
    while (repeat < len) {
        output = output + generateRandomNumberFromRange(0,9);
        repeat ++ 
    }
    return output
}

function generateRandomPhoneNumber() {
    const num1 = generateRandomNumber(3);
    const num2 = generateRandomNumber(3);
    const num3 = generateRandomNumber(4);
    return `1-${num1}-${num2}-${num3}`
    
}


/*
    @func generateRandomRGB
    @returns {string}
    @desc - generates a random rgb value
            HINT: you will need to use the 
                  generateRandomNumberFromRange 
                  function from above
    
    @example generateRandomRGB(); // "rgb(255, 123, 0)"
*/

function generateRandomRGB() {
    const num1 = generateRandomNumberFromRange(0,256);
    const num2 = generateRandomNumberFromRange(0,256);
    const num3 = generateRandomNumberFromRange(0,256);
    
    return `rgb(${num1}, ${num2}, ${num3})`;
}

/*
    @func generateLottoTicket
    @returns {string}
    @desc - generates a random lotto ticket with:
            A random number 0-9
            A random number 0-15
            A random number 0-30
            
            Present it as such: L [0-9] [0-15]-[0-30]
    
    @example generateLottoTicket(); // L 9 11-28
*/

function generateLottoTicket() {
    const num1 = generateRandomNumberFromRange(0,9);
    const num2 = generateRandomNumberFromRange(0,15);
    const num3 = generateRandomNumberFromRange(0,30);
    
    return `L ${num1} ${num2}-${num3}`;
}
 
/*
    @func generatePhoneNumberWithAreaCode
    @param {number} areaCode
    @returns {string}
    @desc - generates a random phone number of the form
            1-718-786-2825
            
            IF `areaCode` is provided, it will use that area code
            and NOT generate one
            
    @example generatePhoneNumberWithAreaCode(); // "1-718-786-2825"
    @example generatePhoneNumberWithAreaCode( 646 ); // "1-646-786-2825"
*/

function generatePhoneNumberWithAreaCode(areaCode) {
    if (areaCode !== undefined ) {
        const num2 = generateRandomNumber(3);
        const num3 = generateRandomNumber(4);
        return `1-${areaCode}-${num2}-${num3}`
    }
    return generateRandomPhoneNumber();
    
}


/*
    @func generateTicketWithLetters
    @returns {string}
    @desc - geneartes a random lotto ticket with:
            A random number 0-9
            A random LOWERCASED LETTER a-z
            A random UPPERCASED LETTER A-Z
            A random number 0-30
            
            Present it as such: L [a-z] [A-Z]-[0-30]
            HINT: look up `String.fromCharCode()` on the Google
            
        @example generateLottoTicket(); // L g M-28
*/

function generateTicketWithLetters() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const letter1 = lower[generateRandomNumberFromRange(0,25)];
    const letter2 = upper[generateRandomNumberFromRange(0,25)];
    const num = generateRandomNumberFromRange(0,30);
    
    return `L ${letter1} ${letter2}-${num}`
}

/*
    @func rockPaperScissors
    @param {string} player1
    @param {string} player2
    @returns {number}
    @desc - given a player1 and player2
            returns 1 if player1 has won
            returns 2 if player2 has won
            returns 0 if tie
            returns -1 if invalid input
            expects both player1 and player2 inputs to be either
            "rock", "paper", or "scissors"
    
    @example rockPaperScissors( "rock", "paper" ); // 2
    @example rockPaperScissors( "rock", "scissors"); // 1
    @example rockPaperScissors( "rock", "rock" ); // 0
    @example rockPaperScissors( "r", "p" ); // -1
    @example rockPaperScissors( "r" ); // -1
    @example rockPaperScissors(); // -1
*/

function rockPaperScissors(player1, player2) {
    if (player1 === 'rock') {
        switch (player2) {
            case 'rock':
                return 0;
            case 'paper':
                return 2;
            case 'scissors':
                return 1;
        }
        return -1;
    } else if (player1 === 'paper') {
        switch (player2) {
            case 'rock':
                return 1;
            case 'paper':
                return 0;
            case 'scissors':
                return 2;
        }
        return -1;
    } else if (player1 === 'scissors') {
        switch (player2) {
            case 'rock':
                return 2;
            case 'paper':
                return 1;
            case 'scissors':
                return 0;
        }
        return -1;
    } else {
        return -1;
    }
}

/*
    @func RPSwithComputer
    @param {string} player
    @returns {number}
    @desc - given a player,
            randomly selects a "choice" for the computer
            RUNS rockPaperScissors from before with computer's choice
            as `player2`
            expect same results as above

    @example rockPaperScissors( "rock" ); // 2, if computer won
    @example rockPaperScissors( "rock" ); // 1, if player won
    @example rockPaperScissors( "rock" ); // 0, if tied
    @example rockPaperScissors(); // -1
*/

function RPSwithComputer(player) {
    const choices = ['rock','paper','scissors'];
    const computer = choices[generateRandomNumberFromRange(0,2)];
    return rockPaperScissors(player,computer);
}
