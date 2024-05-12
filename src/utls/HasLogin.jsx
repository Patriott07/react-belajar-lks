function HasLogin(navigate){
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    if(token != null){
        if(user.user_id == 1){
            navigate('/create');
        }else{
            navigate('/');
        }
    }

}

export default HasLogin;