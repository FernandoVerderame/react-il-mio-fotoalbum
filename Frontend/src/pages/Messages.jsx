import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { MdDelete as DeleteBtn } from "react-icons/md";

const Messages = () => {

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await axios.get('/messages');
        const newMessages = res.data;
        setMessages(newMessages);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <section id="messages" className="container my-5">
            <div className="mb-5">
                <h1 className="m-0 text-white">Messaggi</h1>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table table-hover table-dark w-75">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-secondary">#</th>
                            <th scope="col" className="bg-secondary">Email</th>
                            <th scope="col" className="bg-secondary">Content</th>
                            <th scope="col" className="bg-secondary">User Name</th>
                            <th scope="col" className="bg-secondary">User Email</th>
                            <th scope="col" className="bg-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-white h3">Nessun messaggio ricevuto!</td>
                            </tr>
                        ) : (
                            messages.map(({ id, email, content, user }, i) => (
                                <tr key={id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{email}</td>
                                    <td>{content}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="d-flex justify-content-end">
                                        <button className="btn btn-sm btn-danger">
                                            <DeleteBtn className="fs-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Messages;