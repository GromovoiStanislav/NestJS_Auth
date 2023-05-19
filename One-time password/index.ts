import { authenticator, totp, hotp } from 'otplib';

authenticator.options = {
  step: 15*60, // секунд
  digits: 6 // длинна
};
console.log(authenticator.allOptions());

const secret = authenticator.generateSecret();
const token = authenticator.generate(secret);

try {
  const isValid = authenticator.check(token, secret);
  // const isValid = authenticator.verify({ token, secret });
} catch (err) {
  console.error(err);
}

/** // For TOTP
const token = totp.generate(secret);
const isValid = totp.check(token, secret);
const isValid = totp.verify({ token, secret });
 */

/** // For HOTP
const token = hotp.generate(secret, counter);
const isValid = hotp.check(token, secret, counter);
const isValid = hotp.verify({ token, secret, counter });
 */

/**
 // setting
 authenticator.options = { digits: 6 };
 totp.options = { digits: 6 };
 hotp.options = { digits: 6 };

 // getting
 const opts = authenticator.options;
 const opts = totp.options;
 const opts = hotp.options;

 // reset to default
 authenticator.resetOptions();
 totp.resetOptions();
 hotp.resetOptions();

 // getting all options, with validation
 const opts = authenticator.allOptions();
 const opts = totp.allOptions();
 const opts = hotp.allOptions();
 */