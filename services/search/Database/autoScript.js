const { exec } = require('child_process');

let x = 9910000;
const increase = () => {
  x += 90000;
};

const indexDoc = () => {
  increase();
  console.log(x);
  exec(`node ./dataGenerator.js ${x}`, (err, stdout, stderr) => {
    exec('node ./index.js', (err, stdout, stderr) => {
      console.log('done');
    });
  });
};

indexDoc();