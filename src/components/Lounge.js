import { Link } from "react-router-dom"

const Lounge = () => {
    
    return (
        <section>
            <h1>Data List </h1>
            <br />
            <p>Table</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge
