var view = (function () {

    var getInitialNumberOfPieces = function () {
            return 4;
        },

        renderPieces = function (pieces) {
            var i,
                button;

            clearPiecesWindow();

            for (i = 0; i < pieces.length; i++) {
                button = document.createElement("button");
                button.id = i;
                button.setAttribute("onclick", "controller.takeAShot(" + i + ")");
                if (pieces[i].toGuess === true) {
                    button.classList.add('pieceToGuess');

                    // console.log("Piece to guess: " + i);
                    // console.log("toGuess: " + pieces[i].toGuess);
                    // console.log("wasGuessed: " + pieces[i].wasGuessed);
                } else {
                    button.classList.add('lockedPiece');

                    // console.log("Regular piece: " + i);
                    // console.log("toGuess: " + pieces[i].toGuess);
                    // console.log("wasGuessed: " + pieces[i].wasGuessed);
                }
                document.getElementById("pieces").appendChild(button);

                setTimeout(unlockPiecesForClick, 1000);
            }
        },

        clearPiecesWindow = function () {
            var piece;
            while (document.getElementById("pieces").hasChildNodes()) {
                piece = document.getElementById("pieces").firstChild;
                document.getElementById("pieces").removeChild(piece);
            }
        },

        highlightPieces = function (pieces) {

        },

        unlockPiecesForClick = function (pieces) {
            var i;
            pieces = document.getElementById("pieces").children;
            for (i = 0; i < pieces.length; i++) {
                pieces[i].setAttribute("class", "unlockedPiece");
            }
        },

        insertLevelMessage = function (message) {
            var messageLevel;
            messageLevel = document.getElementById("level");
            messageLevel.innerHTML = message;
        };

    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'renderPieces': renderPieces,
        'clearPiecesWindow': clearPiecesWindow,
        'insertLevelMessage': insertLevelMessage
    }
})();
