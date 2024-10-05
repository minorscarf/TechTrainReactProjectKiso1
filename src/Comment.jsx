import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

export const Comment = () => {
    const { thread_id } = useParams();  
    const BaseUrl = `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`;  // 動的にURLを生成
    const [threadComment, setThreadComment] = useState([]);
    const [sendComment, setSendComment] = useState('');
    const location = useLocation();
    const {title} = location.state;

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
            <h2>スレッドタイトル: {title}</h2> 
            
            <Grid container spacing={2} direction="column" alignItems="center">
              {threadComment && threadComment.map((comment, index) => (  
                  <Grid item xs={12} key={index} style={{width: '30%', maxHeight: '70px'}}>
                      <Card>
                          <CardContent>
                              <Typography>
                                  {comment.post}  
                              </Typography>
                          </CardContent>
                      </Card>
                  </Grid>
              ))}
            </Grid>

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
