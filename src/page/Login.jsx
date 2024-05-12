import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HasLogin from "../utls/HasLogin";
import axios from "axios";

let baseUrl = "http://localhost/web-tech/SERVER_MODULE/mySteam/public/api/v1";

function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        HasLogin(navigate);
    })

    const handleLogin = async (e) => {
        e.preventDefault();

        let button = document.querySelector('.buttonSubmit');
        button.innerHTML = 'Wait still process'
        button.disabled = true;
        try{
            const res = await axios.post(`${baseUrl}/auth/login`, {
                email : e.target[0].value,
                password : e.target[1].value,
            },);

            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if(res.data.user.user_id == 1){
                navigate('/create');
            }else{
                navigate('/');
            }
            
        }catch(err){
            console.log(err)
            if(err.response.status == 402){
                alert(err.response.data.message);
            }

            if(err.response.status == 403){

            }
        }finally{
            button.innerHTML = 'Sign in'
            button.disabled = false;
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                            Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="" method="post" onSubmit={handleLogin}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write email here.." required/>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                               
                                <button type="submit" style={{backgroundColor: 'blue'}} className="buttonSubmit w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/register" onClick={(e) => {e.preventDefault(); navigate('/register')}} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;