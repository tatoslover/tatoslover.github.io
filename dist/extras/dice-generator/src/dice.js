function rollDice(faces) {
  if (faces < 1) throw new Error("Invalid number of faces.");
  return Math.floor(Math.random() * faces) + 1;
}

// Export only if using Node.js or Jest
if (typeof module !== "undefined") {
  module.exports = rollDice;
}
