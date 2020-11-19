import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    infoWrapper:{
        flex:1,
        marginTop:'60px'
    },
    gridImg:{
        width:'100%',
        height:'auto'
      },
    gridTitleHeading:{
        fontWeight:'bold',
        width:'20%'
    },
    gridTitle:{
        fontWeight:'normal',
        width:'80%'
      },
    movieInfo:{
      padding:'20px'
    },
    mInfo:{
      display:'flex',
      flex:1,
      flexDirection:'row'
    },
    infoHead:{
        flex:1,
        display:'flex',
        justifyContent:'flex-end'
    },
    button: {
        margin: theme.spacing(1)
      }
}))

export default function SingleMovie() {
    const classes = useStyles();
    const location = useLocation();
    const movieId = location.state.movie_id;
    const [movieInfo, setMovieInfo] = useState([]);
    const history = useHistory()

    useEffect ( () => {
        function getsingleMovieInfo() {
            fetch("https://www.omdbapi.com/?i="+movieId+"&apikey=fd3a4124")
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.Response === "True"){
                        setMovieInfo(result)
                        //console.log(movieInfo)
                    }else{
                        console.log("Error : movie info not found")
                        setMovieInfo([])
                    }
                },
                (error) => {
                  console.log(error)
                }
            )
        }
        getsingleMovieInfo();
    }, [movieId])

    return (
        <div>
             <Container className={classes.infoWrapper}>
                
                { movieInfo.Response === "True" ?
                <Grid container spacing={5} justify="center">
                    <Grid item sm={3} >
                    <Paper>
                        <div className={classes.gridImgBox}>
                        { movieInfo.Poster !== 'N/A' ?
                            <img src={movieInfo.Poster} alt="Movie Poster" className={classes.gridImg}/>
                            : 'Poster Not Found'
                        }
                        </div>
                    </Paper>
                    </Grid>

                    <Grid item xs={9} >
                        <Paper className={classes.movieInfo}>
                            <div className={classes.infoHead}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<ArrowBackIcon />}
                                onClick={() => history.goBack()}
                            >
                                Back
                            </Button>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Title : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Title}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Actors : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Actors}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Director : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Director}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Writer : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Writer}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Plot : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Plot}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Genre : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Genre}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Language : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Language}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    Released : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.Released}
                                </Typography>
                            </div>
                            <div className={classes.mInfo}>
                                <Typography component="h2" className={classes.gridTitleHeading}>
                                    IMDM Rating : 
                                </Typography>
                                <Typography component="h2" className={classes.gridTitle}>
                                    {movieInfo.imdbRating}
                                </Typography>
                            </div>
                        </Paper>
                  </Grid>
                  </Grid>
                : <p>No data found!</p>
                }
                
            </Container>
        </div>
    )
}
