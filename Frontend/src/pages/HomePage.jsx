import axios from "../utils/axiosClient.js";
import FormContact from "../components/FormContact/FormContact.jsx";

const Home = () => {

    const createMessage = async formData => {
        const res = await axios.post('/messages', formData);

        if (res.status < 400) {
            alert('Messaggio inviato con successo!')
        }
    }



    return (
        <div>
            <section id="jumbotron">
                <h1 className="text-white mb-0">"Capture the moment!"</h1>
            </section>

            <FormContact
                onSubmit={createMessage}
            />
        </div>
    );
}

export default Home;