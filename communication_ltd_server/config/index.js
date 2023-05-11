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
      user: 'communicationltd8@gmail.com',
      pass: 'zoantefcwcxodgfc'
    }
  },
  emailFrom: 'noreply@example.com'
};