const NUMBER_OF_DIGITS = 6;
//genera un num de cuenta de 6 digitos
function randomAccount() {
  let number = '';
  for (let i = 0; i < NUMBER_OF_DIGITS; i++) {
    number += getRandomDigit();
  }
  return number;
}
//genera un num aleatorio de 0 a 9
function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}
module.exports = randomAccount;
