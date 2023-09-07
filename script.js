console.log("Welcome To Tic Tac Toe");

let audioturn = new Audio("Iphone Ting - Message Tone.mp3");

let turn = "X";
let isgameover = false;

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let win of wins) {
    if (
      boxtext[win[0]].innerText === turn &&
      boxtext[win[1]].innerText === turn &&
      boxtext[win[2]].innerText === turn
    ) {
      document.querySelector(".info").innerText = "Player " + turn + " wins!";
      isgameover = true;
      // Play the win sound
      document.getElementById("winSound").play();
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let isDraw = true;

  for (let box of boxtext) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw && !isgameover) {
    document.querySelector(".info").innerText = "It's a Draw!";
    isgameover = true;
    // Play the draw sound
    document.getElementById("drawSound").play();
  }
};

const resetGame = () => {
  let boxtext = document.getElementsByClassName("boxtext");

  for (let box of boxtext) {
    box.innerText = "";
  }

  isgameover = false;
  turn = "X";
  document.querySelector(".info").innerText = "Turn for " + turn;
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", (e) => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      audioturn.play();
      if (checkWin()) {
        document.querySelector(".info").innerText = "Player " + turn + " wins!";
        isgameover = true;
      } else {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for Player " + turn;
        checkDraw();
      }
    }
  });
});

document.getElementById("reset").addEventListener("click", resetGame);
