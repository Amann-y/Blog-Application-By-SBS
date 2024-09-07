
export const storeToken = (token)=>{
    if(token){
     localStorage.setItem("Blog-Token", token)
    }else{
        return "Token is not available"
    }
}