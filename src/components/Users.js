import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const LIST_URL = '/category/create';

const Users = () => {
    const [list, setList] = useState();
    const [input, setInput] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/category');
            console.log(response.data);
            setList(response.data);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            const response = await axiosPrivate.post(LIST_URL,
                JSON.stringify({ 'name': input }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
            setInput('');
            getUsers();
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    console.log(list);
    return (
        <div>
            <h1>List Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    required
                />
                <button>Add List</button>
            </form>
            <br />

            <article>
                <h2>Items List</h2>
                <table id="customers">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Command</th>
                    </tr>

                    {list?.data?.length
                        ? (
                            list?.data?.map((list, i) =>
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{list?.name}</td>
                                    <td>{list?.is_active ? "true":"false"}</td>
                                    <td>button</td>
                                </tr>
                            )
                        ) : <p>No list to display</p>
                    }
                </table>

            </article>
        </div>
    );
};

export default Users;
