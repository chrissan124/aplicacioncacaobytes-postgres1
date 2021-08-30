export default function validateExp(regEx, arg, kind){
    if (Array.isArray( regEx)){
        let valid = false
        regEx.forEach(reg=>{
            if (reg.test(arg)){
                valid = true 
                return
            }
        })
        if (valid) return valid
    }else {
       if(regEx && regEx.test(arg)){
            return true
       }
    }
    throw new Error (`Validation Error: ${arg} is not a valid ${kind?kind:'value'}!`)
}

