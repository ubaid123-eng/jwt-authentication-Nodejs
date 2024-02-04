const bcrypt = require('bcrypt');


// use compare method to verify the password concifrmation
const comparepass = async (reqpassword, password) => {
    const compare = await bcrypt.compare(reqpassword, password);
    return compare;
  };
  

  // check the req mobile length
  const checkMobileLength = (mobilenum) => {
    if (mobilenum.length !== 11) {
      return false;
    }
    return true;
  };




module.exports = {
    comparepass,
    checkMobileLength
}