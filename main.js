const Gameboard = (() => {
  let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let count = 0;
  let p1;
  let p2;

  const Player = (name) => {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;
    return { name, addScore, getScore };
  };

  const renderTicTacToeBtn = () => {
    const board = document.querySelector(".board");
    board.innerHTML = "";

    gameboard.forEach((btn, i) => {
      const ticTacToeBtn = document.createElement("button");
      ticTacToeBtn.textContent = isNaN(btn) ? btn : "";
      ticTacToeBtn.setAttribute("value", i);
      ticTacToeBtn.addEventListener("click", addTicTacToeChoice);
      board.appendChild(ticTacToeBtn);
    });
  };

  const addTicTacToeChoice = (event) => {
    event.preventDefault();
    if (
      !(
        gameboard[Number(event.target.value)] == "X" ||
        gameboard[Number(event.target.value)] == "O"
      )
    ) {
      gameboard[Number(event.target.value)] = count % 2 == 0 ? "X" : "O";
      count++;
    }
    checkWinner();
  };

  const checkMark = (mark) => {
    if (mark == "X") {
      p1.addScore();
      setTimeout(() => {
        alert("Player 1 wins!");
      }, 50);
      endGame();
    } else {
      p2.addScore();
      setTimeout(() => {
        alert("Player 2 wins!");
      }, 50);
      endGame();
    }
    updateScore(p1, p2);
  };

  const checkWinner = () => {
    renderTicTacToeBtn();
    // check x or o winner
    switch (true) {
      case gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2]:
        checkMark(gameboard[0]);
        break;
      case gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5]:
        checkMark(gameboard[3]);
        break;
      case gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8]:
        checkMark(gameboard[6]);
        break;
      case gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6]:
        checkMark(gameboard[0]);
        break;
      case gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7]:
        checkMark(gameboard[1]);
        break;
      case gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8]:
        checkMark(gameboard[2]);
        break;
      case gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8]:
        checkMark(gameboard[0]);
        break;
      case gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6]:
        checkMark(gameboard[2]);
        break;
      default:
        if (gameboard.every((el) => isNaN(el))) {
          setTimeout(() => {
            alert("Draw!");
          }, 50);
          endGame();
        }
    }
  };

  const endGame = () => {
    const btn = document.querySelectorAll(".board button");
    btn.forEach((button) =>
      button.removeEventListener("click", addTicTacToeChoice)
    );
  };

  const newGame = () => {
    window.location.reload();
  };

  const nextGame = () => {
    gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    count = 0;
    renderTicTacToeBtn();
  };

  const start = (event) => {
    event.preventDefault();

    const data = event.target;
    const player1 = data.elements.p1.value;
    const player2 = data.elements.p2.value;

    p1 = Player(player1);
    p2 = Player(player2);

    const menu = document.querySelector(".menu");
    menu.classList.add("hide");

    updateScore(p1, p2);
  };

  const updateScore = (player1, player2) => {
    const p1Score = document.querySelector(".p1");
    p1Score.textContent = `${p1.name} (X): ${p1.getScore()}`;
    const p2Score = document.querySelector(".p2");
    p2Score.textContent = `${p2.name} (O): ${p2.getScore()}`;
  };

  const btn = document.querySelectorAll(".board button");
  btn.forEach((button) => button.addEventListener("click", addTicTacToeChoice));

  const newGameBtn = document.querySelector(".new");
  newGameBtn.addEventListener("click", newGame);

  const nextBtn = document.querySelector(".next");
  nextBtn.addEventListener("click", nextGame);

  const form = document.querySelector("form");
  form.addEventListener("submit", start);

  // make a menu to create player, so player object can be used

  // const form = document.querySelector("form");
  // form.addEventListener(start);

  // const container = document.querySelector(".board");
  // renderTicTacToeBtn(container);
})();

// radio opponent when chose player2 theres new input below it for player2 name
// when play button pressed reset header and display player and comp/player2 score
// new game clicked remove button and change to display score
// after finish 3 times
