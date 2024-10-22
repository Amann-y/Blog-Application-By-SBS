
export const storeToken = (token, isAuth=null)=>{
    if(token){
     localStorage.setItem("Blog-Token", token)
     localStorage.setItem("isAuth", isAuth)
    }else{
        return "Token is not provided"
    }
}