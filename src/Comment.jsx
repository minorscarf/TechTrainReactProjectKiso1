import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";  // useParamsをインポートしてURLパラメータを取得

export const Comment = () => {
    const { thread_id } = useParams();  // URLからthread_idを取得
    const BaseUrl = `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`;  // 動的にURLを生成
    const [threadComment, setThreadComment] = useState([]);
    const [sendComment, setSendComment] = useState('');

    useEffect(() => {
        fetch(BaseUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (Array.isArray(data.posts)) {
                setThreadComment(data.posts);  
            } else {
                setThreadComment([]);  
            }
        })
        .catch(error => console.error("エラーが発生しました", error));
    }, [BaseUrl]);

    const PostComment = async () => {
        if (sendComment.trim() === "") {
            alert("コメントを入力してください");
            return;
        }

        const response = await fetch(BaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post: sendComment,  
            }),
        });

        if (response.ok) {
            setSendComment('');  
            setThreadComment([...threadComment, { post: sendComment }]);
        }
    };

    return (
        <section>
            <h2>スレッドID: {thread_id}</h2> 
            
            <ul>
                {threadComment.map((comment, index) => (
                    <li key={index}>{comment.post}</li>

                ))}
            </ul>

            <input 
                type="text" 
                value={sendComment}
                onChange={(e) => setSendComment(e.target.value)}
                placeholder="コメントを入力"
            />

            <button onClick={PostComment}>コメントを投稿</button>
            <button>
                <Link to={'/'}>ホームに戻る</Link>
            </button>
        </section>
    );
};
