module.exports = {
  passwordLength: 10,
  passwordComplexity: {
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialCharacters: true
  },
  passwordHistory: 3,
  passwordDictionary: ['password', '123456', 'qwerty'],
  loginAttempts: 3,
  emailTransport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'example@gmail.com',
      pass: 'password'
    }
  },
  emailFrom: 'noreply@example.com'
};
