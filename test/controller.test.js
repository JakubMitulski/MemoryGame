describe('Game', function () {
    it('should test startGame with mock methods', function () {
        var pieces = [{},{},{},{}];

        spyOn(view, 'getUserNumberOfPieces').and.returnValue(4);
        spyOn(view, 'getUserNumberOfMistakes').and.returnValue(0);
        spyOn(game, 'startGame');
        spyOn(game, 'producePieces').and.returnValue(pieces);
        spyOn(view, 'renderPieces');
        spyOn(game, 'getLevel').and.returnValue(1);
        spyOn(view, 'insertLevelMessage');
        spyOn(game, 'getPiecesToGuess').and.returnValue([{}]);
        spyOn(view, 'insertCurrentNumberOfPiecesToGuessMessage');

        controller.startGame();
        expect(game.startGame).toHaveBeenCalledWith({numberOfPieces: 4, numberOfMistakes: 0});
        expect(view.renderPieces).toHaveBeenCalledWith(pieces);
        expect(view.insertLevelMessage).toHaveBeenCalledWith("Current level: " + 1);
        expect(view.insertCurrentNumberOfPiecesToGuessMessage).toHaveBeenCalledWith("Amount of pieces to guess: " + 1);

    });
});
