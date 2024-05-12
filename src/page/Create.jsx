import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthCheck from "../utls/AuthCheck";
import Navbar from "../component/Navbar";

let baseUrl = "http://localhost/web-tech/SERVER_MODULE/mySteam/public/api/v1";

function Create() {
    const navigate = useNavigate();
    useEffect(() => {
        AuthCheck(navigate, '/login');

        let user = JSON.parse(localStorage.getItem('user'));
        if (user == null || user.user_id != 1) {
            console.log('pindahkan')
            navigate('/login');
        }

    }, []);

    const handlePostGame = async (e) => {
        e.preventDefault();

        console.log(e);

        let button = document.querySelector('.submitBtn');
        button.innerHTML = 'Process, please wait..'
        button.disabled = true;

        let formData = new FormData();

        formData.append('title', e.target[0].value);
        formData.append('price', e.target[1].value);
        formData.append('description', e.target[2].value);
        formData.append('image_file', e.target[3].files[0]);

        let collectionImage = e.target[4].files;

        for (let i = 0; i < collectionImage.length; i++) {
            formData.append('gallery[]', collectionImage[i]);
        }


        try {
            const res = await axios.post(`${baseUrl}/games/create`,formData, {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type" : "multipart/form-data"
                }
            })

            console.log(res)
            alert(res.data.message);
            window.location.reload();

        } catch (err) {
            console.log(err)
        } finally {
            button.innerHTML = 'Submit'
            button.disabled = false;
        }
    }

    return (
        <div className="min-h-[100vh] flex justify-center items-center py-20">
            <form onSubmit={handlePostGame} class="max-w-sm md:min-w-[400px] h-fit mx-auto" action="" method="post" encType="multipart/form-data">
                <div className="text-3xl font-bold mb-5">
                    Form Upload games
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>

                <div className="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Thumbnail</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" name="image_file" />

                </div>
                <div className="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Gallery</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" name="gallery" multiple />
                    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">You can sleect multiple image</div>
                </div>

                <button type="submit" class="submitBtn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    );
}

export default Create;