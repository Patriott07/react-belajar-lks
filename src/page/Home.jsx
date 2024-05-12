import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthCheck from "../utls/AuthCheck";
import Navbar from "../component/Navbar";

let baseUrl = "http://localhost/web-tech/SERVER_MODULE/mySteam/public/api/v1";

function Home() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [games, setGames] = useState([]);
    const [categ, setCateg] = useState([]);

    useEffect(() => {
        AuthCheck(navigate, '/login');
        if (localStorage.getItem('user') != null) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        let handleData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/games?p=${pagination}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log(res);
                setGames([...games, ...res.data.collection]);
                setCateg([...categ, ...res.data.category]);
            } catch (err) {
                console.log(err);
            }
        }

        handleData();

    }, []);

    const handleGetGamesByCateg = async (categ_id) => {

        let buttonCateg = document.querySelectorAll('.button-categ');
        buttonCateg.forEach((element, i) => {
            buttonCateg[i].disabled = true;
        });
        try{
            const res = await axios.get(`${baseUrl}/games?p=${pagination}&categ=${categ_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setGames(res.data.collection);
        }
        catch(err){
            console.log(err)
        }finally{
            buttonCateg.forEach((element, i) => {
                buttonCateg[i].disabled = false;
            });
        }
    }

    const handleLogout = async () => {
        let ask = window.confirm('Are you wanna logout?');
        if (ask) {
            try {
                const res = await axios.post(`${baseUrl}/auth/logout`, {}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                alert(res.data.message);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');

            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="py-40 px-10">
            <Navbar handleLogout={handleLogout} />
            <h2 className="text-4xl font-bold my-5">Telusuri berdasrkan category</h2>

            <div className="my-5">
                {categ.length > 0 ? (
                    categ.map((value) => {
                        return (
                            <button onClick={() => {navigate(`?categ=${value.id}&s=${value.name}`); handleGetGamesByCateg(value.id)}} type="button" class="button-categ text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{value.name}</button>
                        )
                    })
                ) : null}
            </div>



            <div className="flex justify-around flex-wrap gap-8  ">

                {games.length > 0 ? (
                    games.map((element) => {
                        return (
                            <div onClick={() => {navigate(`/games/detail/${element.id}`)}}>
                                <div className="w-full  min-w-96 max-w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <div className="w-[100%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${element.image})` }}>

                                    </div>

                                    <div className="px-5 py-8">
                                        <a href="#">
                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{element.title}</h5>
                                        </a>
                                        <div className="flex items-center mt-2.5 mb-5">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp.{element.price}</span>
                                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : null}
            </div>
        </div>
    )


}

export default Home;