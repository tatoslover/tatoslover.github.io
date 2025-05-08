// Only run if in the browser
if (typeof document !== "undefined") {
  const rollButton = document.getElementById("roll-button");
  const diceSelect = document.getElementById("dice-select");
  const resultDiv = document.getElementById("result");

  rollButton.addEventListener("click", () => {
    const faces = parseInt(diceSelect.value, 10);
    const result = rollDice(faces);
    resultDiv.textContent = `${result}`;
  });
}
