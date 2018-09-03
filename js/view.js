"use strict";
var view = (function () {

    var renderPieces = function (pieces) {
            var i,
                piece;

            clearPiecesWindow();

            for (i = 0; i < pieces.length; i++) {
                piece = document.createElement("button");
                piece.id = i;
                piece.setAttribute("onclick", "controller.takeAShot(" + i + ")");
                if (pieces[i].toGuess === true) {
                    piece.classList.add('pieceToGuess');
                } else {
                    piece.classList.add('lockedPiece');
                }
                document.getElementById("pieces").appendChild(piece);

                setTimeout(preparePiecesForClick, getCustomHighlightTime());
            }
        },

        clearPiecesWindow = function () {
            var piece;

            while (document.getElementById("pieces").hasChildNodes()) {
                piece = document.getElementById("pieces").firstChild;
                document.getElementById("pieces").removeChild(piece);
            }
        },

        highlightPiecesToGuess = function (pieces) {
            var i, buttons;

            buttons = document.getElementById("pieces").children;

            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toGuess === true) {
                    buttons[i].setAttribute("class", "pieceToGuess");
                }
            }
        },

        highlightShootPiece = function (index) {
            var pieces;

            pieces = document.getElementById("pieces").children;
            pieces[index].setAttribute("class", "guessedPiece");
        },

        highlightMissedPiece = function (index) {
            var pieces;

            pieces = document.getElementById("pieces").children;
            pieces[index].setAttribute("class", "wrongPiece");
        },

        preparePiecesForClick = function () {
            var i, pieces;

            pieces = document.getElementById("pieces").children;

            for (i = 0; i < pieces.length; i++) {
                pieces[i].setAttribute("class", "regularPiece");
            }
        },

        lockPiecesForClick = function () {
            document.getElementById("pieces").classList.add("disable");
        },

        unlockPiecesForClick = function () {
            document.getElementById("pieces").classList.remove("disable");
        },

        insertLevelMessage = function (message) {
            var messageLevel;

            messageLevel = document.getElementById("level");
            messageLevel.innerHTML = message;
        },

        getUserNumberOfPieces = function () {
            return document.getElementById("userNumberOfPieces").value;
        },

        insertCurrentNumberOfPiecesToGuessMessage = function (numberOfPieces) {
            var numberOfPiecesToGuess;

            numberOfPiecesToGuess = document.getElementById("numberOfPiecesToGuess");
            numberOfPiecesToGuess.innerHTML = numberOfPieces;
        },

        getCustomHighlightTime = function () {
            var userInput = document.getElementById("userHighlightTime").value;
            return 2000 / userInput;
        };


    return {
        'renderPieces': renderPieces,
        'clearPiecesWindow': clearPiecesWindow,
        'insertLevelMessage': insertLevelMessage,
        'highlightShootPiece': highlightShootPiece,
        'highlightMissedPiece': highlightMissedPiece,
        'lockPiecesForClick': lockPiecesForClick,
        'unlockPiecesForClick': unlockPiecesForClick,
        'highlightPiecesToGuess': highlightPiecesToGuess,
        'preparePiecesForClick': preparePiecesForClick,
        'getUserNumberOfPieces': getUserNumberOfPieces,
        'insertCurrentNumberOfPiecesToGuessMessage': insertCurrentNumberOfPiecesToGuessMessage,
        'getCustomHighlightTime': getCustomHighlightTime
    }
})();
