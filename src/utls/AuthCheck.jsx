function AuthCheck(navigate, redirectFail){
    let token = localStorage.getItem('token');

    if(!token || token == null){
        navigate(redirectFail);
    }

}

export default AuthCheck;