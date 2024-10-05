import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Thread = () => {
    const [threadTopic, setThreadTopic] = useState([]);
    const baseUrl = "https://railway.bulletinboard.techtrain.dev"; 
    const getThreadPoint = "/threads"; 

    useEffect(() => {
        fetch(baseUrl + getThreadPoint + '?offset=0')
        .then(res => res.json())
        .then(data => {
            const threads = data.map(thread => ({
                id: thread.id,   // スレッドID
                title: thread.title  // スレッドタイトル
            }));
            setThreadTopic(threads);
        })
        .catch(error => console.error("エラーが発生しました", error));
    }, []);

    return(
        <section>
            <Grid container spacing={2} direction="column" alignItems="center">
              {threadTopic && threadTopic.map((thread, index) => (  
                  <Grid item xs={12} key={index} style={{width: '30%', maxHeight: '70px'}}>
                    <Link to={`/threads/${thread.id}`} state={{title:thread.title}}>
                      <Card style={{cursor: 'pointer'}}>
                          <CardContent>
                              <Typography>
                                  {thread.title}  
                              </Typography>
                          </CardContent>
                      </Card>
                    </Link>
                  </Grid>
              ))}
            </Grid>
        </section>
    );
};

export default Thread;
