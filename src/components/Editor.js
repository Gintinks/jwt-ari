import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getUser } from "../redux/action";
import yee from "../assets/yee.png"
const PROFILE_URL = '/user/profile';

const Editor = () => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.reducerUser)
    console.log(user);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(PROFILE_URL, {
                    signal: controller.signal
                });
                console.log(response.data.data);
                isMounted && dispatch(getUser(response.data.data))

            } catch (err) {
                console.error(err);
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <section>
            <h1>Profile Page</h1>
            <br />
            <h3>
                Welcome, {user.data.id}!
            </h3>
            <div className="card-center">
                <div className="card">
                    <img src={yee} alt="Avatar" />
                    <div className="container-card">
                        <h4><b>{user.data.name}</b></h4>
                        <p>{user.data.email}</p>
                    </div>
                </div>
            </div>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor
