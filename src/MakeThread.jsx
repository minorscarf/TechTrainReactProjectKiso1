import { Link } from "react-router-dom";
import { useState } from "react";

export const MakeThread = () => {
    const ApiUrl = "https://railway.bulletinboard.techtrain.dev/threads"
    const [threadTitle,setThreadTitle] = useState('');

    const sendThread = async () => {
        if (!threadTitle) {
            alert("スレッドのタイトルを入力してください");
            return;
        }

        try {
            const response = await fetch(ApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                title: threadTitle, 
                }),
            });

            if (response.ok) {
                alert("スレッドが作成されました！");
                setThreadTitle(''); 
            } else {
                alert("スレッドの作成に失敗しました");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("エラーが発生しました");
        }
    };

    return (
        <>
          <button>
              <Link to={'/'}>ホームに戻る</Link>
          </button>

          <input 
            type="text"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            placeholder="スレッドのタイトルを入力" />

          <button onClick={sendThread}>スレッドを投稿</button>
        </>
    );
};
