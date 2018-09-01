var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,
        pieces = [],
        level = 1,

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
                if (currentNumberOfPieces === 4) {
                    level = 1;
                }
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
            producePieces();
        },

        getPieces = function () {
            return pieces;
        },

        producePieces = function () {
            var i;
            pieces = [];

            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({});
                pieces[i].toGuess = false;
                pieces[i].wasGuessed = false;
            }
            pieces = piecesToGuess();

            return pieces;
        },

        piecesToGuess = function () {
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

        getPiecesToGuess = function () {
            return pieces.filter(function (piece) {
                return piece.toGuess;
            });
        },

        isSomethingLeftToShoot = function () {
            var i,
                isSomethingLeft = false;

            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toGuess === true && pieces[i].wasGuessed === false) {
                    isSomethingLeft = true;
                }
            }

            return isSomethingLeft;
        },

        takeAShot = function (id) {
            var status;

            if (pieces[id].toGuess === false || pieces[id].wasGuessed === true) {
                status = "gameover";
                level = 1;
            } else if (pieces[id].toGuess === true) {
                pieces[id].wasGuessed = true;
                status = "shoot";
                if (isSomethingLeftToShoot() === false) {
                    status = "nextlevel";
                }
            }

            return status;
        },

        nextLevel = function () {
            var config = {
                numberOfPieces: ++currentNumberOfPieces
            };
            level++;
            startGame(config);
        },

        getLevel = function () {
            return level;
        };

    return {
        'startGame': startGame,
        'producePieces': producePieces,
        'piecesToGuess': piecesToGuess,
        'takeAShot': takeAShot,
        'getPiecesToGuess': getPiecesToGuess,
        'isSomethingLeftToShoot': isSomethingLeftToShoot,
        'nextLevel': nextLevel,
        'getPieces': getPieces,
        'getLevel': getLevel
    }
})();
