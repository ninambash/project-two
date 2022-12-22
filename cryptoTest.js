///concription is a two way process ---data is encrypted using an algorythm kwy
const mySectret = 'I eat cookies for breakfast'
const secretkey = 'myPassword'

///AS incription 
const crypto = require('crypto-js')

const myEncription = crypto.AES.encrypt(String(100),secretkey)
console.log(myEncription.toString())

const decrypt = crypto.AES.decrypt(myEncription.toString(),secretkey)
console.log(decrypt.toString(crypto.enc.Utf8))



////hashing is one way process, once data has been hashed, you cannot unhash it
const bcrypt = require('bcrypt')
const userPassword = '12345password'

const hashedPassword = bcrypt.hashSync(userPassword,12)
console.log(hashedPassword)

console.log(bcrypt.compareSync('wrong', hashedPassword))