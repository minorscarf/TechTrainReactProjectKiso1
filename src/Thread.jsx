import { useEffect } from "react";
import { useState }  from  "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

export const Thread = () => {
    const [threadTopic, setThreadTopic] = useState();
    const baseUrl  = "https://railway.bulletinboard.techtrain.dev"; 
    const getThreadPoint = "/threads"; 

    useEffect(() => {
        fetch(baseUrl + getThreadPoint+'?offset=0')
        .then(res => res.json())
        .then(data => {
            const titles = data.map(thread => thread.title);
            setThreadTopic(titles);
        })
    },[]);

    return(
        <section>
            <Grid container spacing={2} direction="column" alignItems="center">
              {threadTopic && threadTopic.map((title,index) => ( 
                  <Grid item xs={12} key={index} style={{width: '30%', maxHeight:'70px'}}>
                      <Card>
                        <CardContent>
                            <Typography>
                                {title}
                            </Typography>
                        </CardContent>
                      </Card>
                  </Grid>
            ))}
            </Grid>
        </section>
    );
};

export default Thread