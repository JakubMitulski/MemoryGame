var controller = function () {
    var startGame = function () {
            var initialNumberOfPieces = view.getInitialNumberOfPieces();

            game.startGame({
                numberOfPieces: initialNumberOfPieces
            });
            view.renderPieces(game.producePieces());
            view.insertLevelMessage("Current level: " + game.getLevel());

        },

        takeAShot = function (i) {
            var status = game.takeAShot(i);

            if (status === "nextlevel") {
                game.nextLevel();
                view.renderPieces(game.producePieces());
                view.insertLevelMessage("Current level: " + game.getLevel());
            }
            if (status === "gameover") {
                startGame();
                view.insertLevelMessage("Current level: " + game.getLevel());
            }
        };

    return {
        'startGame': startGame,
        'takeAShot': takeAShot
    }
}();
