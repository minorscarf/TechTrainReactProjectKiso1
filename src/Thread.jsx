import { useEffect } from "react";
import { useState }  from  "react";

export const Thread = () => {
    const [threadTopic, setThreadTopic] = useState();
    const baseUrl  = "https://railway.bulletinboard.techtrain.dev"; 
    const getThreadPoint = "/threads"; 

    useEffect(() => {
        fetch(baseUrl + getThreadPoint)
        .then(res => res.json())
        .then(data => {
            const titles = data.map(thread => thread.title);
            setThreadTopic(titles);
        })
    },[]);

    return(
        <section>
            <p>{threadTopic}</p>
        </section>
    );
};

export default Thread