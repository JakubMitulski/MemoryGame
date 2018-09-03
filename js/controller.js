"use strict";
var controller = function () {
    var startGame = function () {
            var initialNumberOfPieces = view.getUserNumberOfPieces();

            game.startGame({
                numberOfPieces: initialNumberOfPieces
            });

            view.renderPieces(game.producePieces());
            view.insertLevelMessage("Current level: " + game.getLevel());
            view.insertCurrentNumberOfPiecesToGuessMessage("Amount of pieces to guess: " + game.getPiecesToGuess().length);

        },

        takeAShot = function (i) {
            var status = game.takeAShot(i);

            if (status === "shoot") {
                view.highlightShootPiece(i);
            }
            if (status === "gameover") {
                view.lockPiecesForClick();
                view.highlightMissedPiece(i);

                setTimeout(function () {
                        startGame();
                        view.unlockPiecesForClick();
                        view.insertLevelMessage("Current level: " + game.getLevel());
                        view.insertCurrentNumberOfPiecesToGuessMessage("Amount of pieces to guess: " + game.getPiecesToGuess().length);
                    },
                    getCustomHighlightTime());
            }
            if (status === "nextlevel") {
                view.lockPiecesForClick();
                view.highlightShootPiece(i);

                setTimeout(function () {
                        view.unlockPiecesForClick();
                        view.renderPieces(game.producePieces());
                        view.insertLevelMessage("Current level: " + game.getLevel());
                        view.insertCurrentNumberOfPiecesToGuessMessage("Amount of pieces to guess: " + game.getPiecesToGuess().length);
                    },
                    getCustomHighlightTime());
            }
        },

        highlightPiecesToGuess = function () {
            view.lockPiecesForClick();
            view.highlightPiecesToGuess(game.getPieces());

            setTimeout(function () {
                    view.unlockPiecesForClick();
                    view.preparePiecesForClick();
                },
                getCustomHighlightTime());
        },

        getCustomHighlightTime = function () {
            return view.getCustomHighlightTime();
        };

    return {
        'startGame': startGame,
        'takeAShot': takeAShot,
        'highlightPiecesToGuess': highlightPiecesToGuess
    }
}();
