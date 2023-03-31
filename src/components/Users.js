import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [list, setList] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    function renderRoles(roles) {
        const roleItems = [];

        for (let x in roles) {
            roleItems.push(
                <li key={x}>
                    {x}: {roles[x]}
                </li>
            );
        }

        return roleItems;
    }
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/category?page=1&limit=15&is_active=1&name=ca', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setList(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    console.log(list);
    return (
        <article>
            <h2>Users List</h2>
            {list?.length
                ? (
                    <ul>
                        {list.map((list, i) =>
                            <div key={i}>
                                <li>{list?.username}</li>
                                {renderRoles(list.roles)}
                            </div>
                        )}
                    </ul>
                ) : <p>No list to display</p>
            }
        </article>
    );
};

export default Users;
