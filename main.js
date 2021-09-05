const crypto = require('crypto-js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Do you want to encrypt or decrypt? (e = encrypt, d = decrypt):',
  function (answer) {
    switch (answer) {
      case 'e': {
        rl.question(
          'Enter the text that you want to encrypt: ',
          function (text) {
            rl.question('Enter the encryption password: ', function (secret) {
              const cypherText = crypto.AES.encrypt(text, secret).toString();
              console.log('\r\nYour encrypted text:');
              console.log(cypherText);
              console.log('\r');
              rl.close();
              process.exit(0);
            });
          }
        );
        break;
      }

      case 'd': {
        rl.question('Enter the encrypted text:', function (encryptedText) {
          rl.question('Enter the secret key:', function (secret) {
            const bytes = crypto.AES.decrypt(encryptedText, secret);
            const decypheredText = bytes.toString(crypto.enc.Utf8);
            console.log('\r\nYour decrypted text:');
            console.log(decypheredText);
            console.log('\r');
            rl.close();
            process.exit(0);
          });
        });
        break;
      }

      default: {
        console.log(
          `\r\nInvalid input. Enter "e" to encrypt or "d" to decrypt a text!`
        );
        console.log('\r');
        rl.close();
      }
    }
  }
);
