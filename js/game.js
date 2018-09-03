"use strict";
var game = (function () {

    var currentNumberOfPieces,
        pieces = [],
        level = 1,
        maxNumberOfMistakes = 0,
        numberOfMistakes = 0,
        numberOfShots = 0,

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = parseInt(config.numberOfPieces);
                level = 1;
            }
            if (config && config.numberOfMistakes) {
                maxNumberOfMistakes = parseInt(config.numberOfMistakes);
            }

            numberOfMistakes = 0;
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
                numberOfMistakes++;

                if (numberOfMistakes > maxNumberOfMistakes) {
                    status = "gameover";
                    level = 1;
                    numberOfMistakes = 0;
                    numberOfShots = 0;
                } else {
                    status = "missedshot";
                }
            } else if (pieces[id].toGuess === true) {
                pieces[id].wasGuessed = true;
                status = "shoot";
                if (isSomethingLeftToShoot() === false) {
                    status = "nextlevel";
                    nextLevel();
                }
            }
            numberOfShots++;
            return status;
        },

        nextLevel = function () {
            level++;
            currentNumberOfPieces++;
        },

        getLevel = function () {
            return level;
        },

        getShotPrecision = function () {
            return Math.round(((numberOfShots - numberOfMistakes) / numberOfShots) * 100);
        },

        resetGame = function () {
            currentNumberOfPieces = 0;
            pieces = [];
            level = 1;
            maxNumberOfMistakes = 0;
            numberOfMistakes = 0;
            numberOfShots = 0;
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
        'getLevel': getLevel,
        'getShotPrecision': getShotPrecision,
        'resetGame': resetGame
    }
})();
