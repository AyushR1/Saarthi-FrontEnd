import React, { useEffect } from 'react';
import axios from 'axios';
function RedirectPage() {

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/login/success", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    localStorage.setItem('usersaarthi', JSON.stringify(response.data.user));
                    window.location.href = 'http://localhost:3000/dashboard';
                } else {
                    throw new Error("Authentication has failed.");
                }
            } catch (err) {
                console.log(err);
                const timeout = setTimeout(() => {
                    window.location.href = "http://localhost:3000";
                }, 3000);
                // Clear timeout when component unmounts
                return () => clearTimeout(timeout);
            }
        };

        getUser();
    }, []);

    return (
        <div>
            <h1>Logging you In!</h1>
        </div>
    );
}

export default RedirectPage;
