const Gameboard = (() => {
  let gameboard = [];

  const Player = (name) => {
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;
    return { name, addScore, getScore };
  };

  const start = () => {};
})();

// radio opponent when chose player2 theres new input below it for player2 name
// when play button pressed reset header and display player and comp/player2 score
// new game clicked remove button and change to display score
// after finish 3 times
