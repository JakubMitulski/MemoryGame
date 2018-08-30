describe('Game', function () {
    it('should have 4 pieces after game start', function () {
        var pieces;
        game.startGame();
        pieces = game.getPieces();
        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);
        pieces = game.getPieces();
        expect(pieces.length).toBe(6);
    });

    it('should start game with 6 pieces overall and 2 pieces to guess', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(2);
    });

    it('should start game with 12 pieces overall and 5 pieces to guess', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 12
            };
        game.startGame(config);
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(5);
    });

    it('should return false when there is possible shoot to make', function () {
        game.startGame();
        expect(game.isSomethingLeftToShoot()).toBe(true);
    });

    it('should return a nextlevel status after successful shot', function () {
        var indexes;
        game.startGame();
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        expect(game.takeAShot(indexes[0])).toBe("nextlevel");
    });

    it('should increase level after successful shot', function () {
        var indexes;
        game.startGame();
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        game.takeAShot(indexes[0])
        expect(game.getLevel()).toBe(2);
    });

    it('should return a gameover status after unsuccessful shot', function () {
        var indexes,
            successfullShotIndex,
            testShotIndex;
        game.startGame();
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        successfullShotIndex = indexes[0];
        if(successfullShotIndex === 0){
            testShotIndex = 1;
        } else {
            testShotIndex = successfullShotIndex - 1;
        }
        expect(game.takeAShot(testShotIndex)).toBe("gameover");
    });

    function findIndexesOfPiecesToGuess(pieces) {
        var i,
            indexes = [];
        for (i = 0; i < pieces.length; i++) {
            if (pieces[i].toGuess === true) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }
});
