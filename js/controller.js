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
                view.insertLevelMessage("Current level: " + game.getLevel());
                view.insertCurrentNumberOfPiecesToGuessMessage("Amount of pieces to guess: " + game.getPiecesToGuess().length);

                setTimeout(function () {
                        startGame();
                        view.unlockPiecesForClick();
                    },
                    getCustomHighlightTime());
            }
            if (status === "nextlevel") {
                view.lockPiecesForClick();
                view.highlightShootPiece(i);
                view.insertLevelMessage("Current level: " + game.getLevel());
                view.insertCurrentNumberOfPiecesToGuessMessage("Amount of pieces to guess: " + game.getPiecesToGuess().length);

                setTimeout(function () {
                        game.nextLevel();
                        view.unlockPiecesForClick();
                        view.renderPieces(game.producePieces());
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
