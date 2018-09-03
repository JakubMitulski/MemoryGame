describe('Game', function () {
    it('should have 4 pieces after game start', function () {
        var pieces,
            config = {
                numberOfPieces: 4,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        pieces = game.getPieces();
        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 4,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        pieces = game.getPieces();
        expect(pieces.length).toBe(6);
    });

    it('should start game with 6 pieces overall and 2 pieces to guess', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(2);
    });

    it('should start game with 12 pieces overall and 5 pieces to guess', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 12,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        piecesToGuess = findPiecesToGuess(game.getPieces());
        expect(piecesToGuess.length).toBe(5);
    });

    it('should return false when there is possible shoot to make', function () {
        var config = {
            numberOfPieces: 6,
            numberOfMistakes: 0
        };
        game.resetGame();
        game.startGame(config);
        expect(game.isSomethingLeftToShoot()).toBe(true);
    });

    it('should return a nextlevel status after successful shot', function () {
        var indexes,
            config = {
                numberOfPieces: 4,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        expect(game.takeAShot(indexes[0])).toBe("nextlevel");
    });

    it('should return a gameover status after unsuccessful shot', function () {
        var indexes,
            successfulShotIndex,
            testShotIndex,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        successfulShotIndex = indexes[0];
        if (successfulShotIndex === 0) {
            testShotIndex = 1;
        } else {
            testShotIndex = successfulShotIndex - 1;
        }
        expect(game.takeAShot(testShotIndex)).toBe("gameover");
    });

    it('should increase game level after nextLevel method call', function () {
        var config = {
            numberOfPieces: 4,
            numberOfMistakes: 0
        };
        game.resetGame();
        game.startGame(config);
        game.startGame();
        game.nextLevel();
        expect(game.getLevel()).toBe(2);
    });

    it('should set game level to 1 after missed shoot', function () {
        var indexes,
            successfulShotIndex,
            testShotIndex,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 0
            };
        game.resetGame();
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        successfulShotIndex = indexes[0];
        if (successfulShotIndex === 0) {
            testShotIndex = 1;
        } else {
            testShotIndex = successfulShotIndex - 1;
        }
        game.takeAShot(testShotIndex)
        expect(game.getLevel()).toBe(1);
    });

    it('should return array of pieces to guess after getPiecesToGuess method call', function () {
        var config = {
            numberOfPieces: 6,
            numberOfMistakes: 0
        };
        game.resetGame();
        game.startGame(config);
        var piecesToGuess = game.getPiecesToGuess();
        expect(piecesToGuess.length).toBe(2);
        expect(piecesToGuess[0].toGuess).toBe(true);
    });

    it('should return a missedshot status after unsuccessful shot', function () {
        var indexes,
            successfulShotIndex,
            testShotIndex,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 1
            };
        game.resetGame();
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        successfulShotIndex = indexes[0];
        if (successfulShotIndex === 0) {
            testShotIndex = 1;
        } else {
            testShotIndex = successfulShotIndex - 1;
        }
        expect(game.takeAShot(testShotIndex)).toBe("missedshot");
    });

    it('should return a gameover status after second unsuccessful shot', function () {
        var indexes,
            successfulShotIndex,
            testShotIndex,
            config = {
                numberOfPieces: 6,
                numberOfMistakes: 1
            };
        game.resetGame();
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        successfulShotIndex = indexes[0];
        if (successfulShotIndex === 0) {
            testShotIndex = 1;
        } else {
            testShotIndex = successfulShotIndex - 1;
        }
        game.takeAShot(testShotIndex);
        expect(game.takeAShot(testShotIndex)).toBe("gameover");
    });

    it('should return shot precision value after shot', function () {
        var indexes,
            config = {
                numberOfPieces: 4,
                numberOfMistakes: 0
            };
        game.startGame(config);
        indexes = findIndexesOfPiecesToGuess(game.getPieces());
        game.takeAShot(indexes[0]);
        expect(game.getShotPrecision()).toBe(100);
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
