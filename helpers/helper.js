const bcrypt=require('bcrypt')

const hashPassword=async (password)=>{
    const salt=await bcrypt.genSalt();
    const hash=await bcrypt.hash(password,salt);
    console.log(hash);
    return hash
}

const comparePassword=async(password,hashed)=>{
    // console.log(password,"&&&&&",hashed);
    try{
        const result=await bcrypt.compare(password,hashed);
        return result
    }catch(err){
        console.log('error');
        return false;
    }
}

module.exports={
    hashPassword,
    comparePassword
}