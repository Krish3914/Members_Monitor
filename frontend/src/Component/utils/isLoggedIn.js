const isLoggedIn = ()=>{
    const token = sessionStorage.getItem("token");
    // console.log("this is token",token);
    return token;
}

export {isLoggedIn};