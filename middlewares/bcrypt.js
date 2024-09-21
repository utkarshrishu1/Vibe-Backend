const bcrypt = require('bcrypt')
async function encryptPassword(next){
    const user = this;
    if(user.isModified("password"))
    {
        const password = user.password;
        const hashedPassword = await bcrypt.hash(password, 8);
        user.password = hashedPassword;
    }
    next();
}
async function validatePassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}
module.exports = {encryptPassword, validatePassword};