import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import AuthCheck from "../utls/AuthCheck";
import Navbar from "../component/Navbar";

let baseUrl = "http://localhost/web-tech/SERVER_MODULE/mySteam/public/api/v1";

function Detail() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [games, setGames] = useState(null);
    const [categ, setCateg] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [comments, setComments] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        AuthCheck(navigate, '/login');
        if (localStorage.getItem('user') != null) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        let handleData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/detail/games/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log(res);
                setGames(res.data.detail.games);
                setCateg(res.data.detail.category);
                setComments(res.data.detail.comments);
                setGallery(res.data.detail.galleri);
            } catch (err) {
                console.log(err);
            }
        }

        handleData();


    }, []);

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

    const handleComment = async (e) => {
        e.preventDefault();

        let button = document.querySelector('.buttonSumbit')
        button.innerHTML = 'Please Waitt';
        button.disabled = true;

        let formData = new FormData();
        formData.append('game_id', id);
        formData.append('content', e.target[0].value);

        try {
            const res = await axios.post(`${baseUrl}/comment`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log(res);
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            console.log(err)
        } finally {
            button.innerHTML = 'Submit';
            button.disabled = false;

        }

    }

    return (
        <div>
            <Navbar handleLogout={handleLogout} />
            <div className="py-20">
                {games != null ? (
                    <div className="mb-8 flex-col flex gap-6">
                        <div className="bg-cover text-whiite text-[20px] text-white p-4 font-medium bg-center h-[80vh] w-[100%]" style={{ backgroundImage: `url(${games.image})` }}>
                            Thumbnail
                        </div>

                        <div className="container mx-auto flex-col flex gap-4">

                            <div className="text-4xl font-bold">{games.title}</div>
                            <p className="pe-8">
                                {games.description}
                            </p>
                            <p>
                                <button type="button" class="text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Rp. {games.price}</button>
                            </p>
                        </div>

                    </div>
                ) : null}

                <div className="flex flex-col gap-4 p-4">
                    {gallery.length > 0 ? (
                        <div>
                            <div className="text-4xl font-bold text-center text-black py-12">Gallery of games</div>
                            {gallery.map((val) => {
                                return (
                                    <div className="bg-cover text-whiite text-[20px] text-white p-4 font-medium bg-center h-[80vh] w-[100%]" style={{ backgroundImage: `url(${val})` }}>
                                        Screenshoot
                                    </div>
                                )
                            })}
                        </div>

                    ) : null}

                </div>

                <div className="mx-auto mt-8">
                    {comments.length > 0 ? (
                        <div>
                            <div className="text-3xl text-center font-bold py-8">All of comments.</div>
                            
                            {comments.map((value) => {
                                return (
                                    <div class="flex items-center justify-center gap-4 mb-8">
                                        <img class="w-20 h-20 rounded-full" src="https://cdn-icons-png.freepik.com/512/2919/2919906.png" alt="Jese image" />
                                        <div class="flex flex-col gap-1 w-full max-w-[320px]">
                                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{value.name}</span>

                                            </div>
                                            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <p class="text-sm font-normal text-gray-900 dark:text-white">{value.content}</p>
                                            </div>

                                        </div>

                                    </div>

                                )
                            })}
                        </div>

                    ) : (
                        <div className="container mx-auto my-8">
                            <div className="text-4xl font-bold mb-3">Whoopss!</div>
                            <div className="text-xl text-slate-400 mb-5">Seems No one comment on this game, be the first!</div>

                        </div>

                    )}

                </div>
                <form action="" className="mx-auto w-[400px] mt-8" method="post" onSubmit={handleComment}>
                    <div className="flex flex-col gap-6 max-w-[400px]">
                        <div className="mb-3">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comments</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." required></textarea>
                        </div>
                        <button type="submit" class="buttonSumbit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Detail;