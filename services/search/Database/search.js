const fs = require('fs');
let englishWords;

// Turn the EnglishWords textfile into an array of words
const readEnglishWords = () => {
  fs.readFile('./EnglishWords.txt', (err, data) => {
    if (err) {
      console.log('error from readFile EnglishWords:', err);
    } else {
      data = data.json();
      englishWords = data.split('\n');
    }
  });
};

readEnglishWords();

// create a random product name 

const productNameGenerator = () => {
  let numOfWords = Math.random() * 10;
  let randomWordIdx = Math.random() * englishWords.length;
  let title = [];
  for (let i = 0; i < numOfWords; i++) {
    title.push(englishWords[randomWordIdx]);
  }
  return title.join(' ');
};


// let createSearchData = () => {
//   for (let i = 0; i < 10000000; i++) {
//     let data = {
//       id: i,
//       name: ,
//       price: 
//     }
//   }

// }