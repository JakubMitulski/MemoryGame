var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
        },

        getPieces = function () {
            var i,
                pieces = [];
            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({});
                pieces[i].toGuess = false;
                pieces[i].wasGuessed = false;
            }
            pieces = piecesToGuess(pieces);
            return pieces;
        },

        piecesToGuess = function (pieces) {
            var i = 0,
                randomNum;
            do {
                randomNum = Math.floor((Math.random() * pieces.length));
                if (pieces[randomNum].toGuess === false) {
                    pieces[randomNum].toGuess = true;
                    i++;
                }
            } while (i < (pieces.length / 2) - 1);
            return pieces;
        },

        getPiecesToGuess = function (pieces) {
            return pieces.filter(function (piece) {
                return piece.toGuess;
            });
        },

        isSomethingLeftToShoot = function (pieces) {
            var i,
                isSomethingLeft = false;

            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toGuess === true && pieces[i].wasGuessed === false) {
                    isSomethingLeft = true;
                }
            }
            return isSomethingLeft;
        },

        takeAShot = function (id, pieces) {
            if (pieces[id].wasGuessed === true) {
                gameOver();
            } else if (pieces[id].toGuess === true) {
                pieces[id].wasGuessed = true;
            }
            if (isSomethingLeftToShoot(pieces) === false) {
                startGame({numberOfPieces: currentNumberOfPieces + 1});
            }
        },

        gameOver = function () {

        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'piecesToGuess': piecesToGuess,
        'takeAShot': takeAShot,
        'gameOver': gameOver,
        'getPiecesToGuess': getPiecesToGuess,
        'isSomethingLeftToShoot': isSomethingLeftToShoot
    }
})();
