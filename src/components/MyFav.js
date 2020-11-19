/* My Fav JS */
import React from 'react';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavAction from './FavAction';

const useStyles = makeStyles((theme) => ({
    navTitle:{
        flex:1,
        justifyContent: 'space-between'
    },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginTop:50
      },
      gridImg:{
        width:'100%',
        height:'auto'
      },
      searchResponseBox:{
        marginTop:'40px'
      },
      gridInfoBox:{
        flex: 1,
        justifyContent: 'space-between',
        display: 'flex'
      },
      gridTitle:{
        margin:'4px 6px'
      },
      gridIconBtn:{
        fontSize:'14px'
      }
}));


export default function MyFav() {
    const classes = useStyles();
    const searchedItems = JSON.parse(localStorage.getItem("myFavList"));
  
    return (
        <React.Fragment>
            <Container className={classes.searchResponseBox}>

      <Grid container  spacing={5} justify="center">
    { 
    searchedItems ?
    searchedItems.length > 0 
    ?
    searchedItems.map((item) => (
        <Grid key={item.imdbID} item sm={3} >
        <Paper className={classes.paper} >
            <div className={classes.gridImgBox}>
              <Link
                  to={
                  {
                      pathname:`single-movie/${item.imdbID}`,
                      state: {movie_id: item.imdbID}
                      }
                  }
              >
              { item.poster !== 'N/A' ?
                  <img src={item.poster} alt="Movie Poster" className={classes.gridImg}/>
                  : 'Poster Not Found'
              }  
            </Link>
            </div>
            <div className={classes.gridInfoBox}>
              <Typography component="h6" className={classes.gridTitle}>
                {item.title}
              </Typography>
              
              <FavAction 
                  fitem_id = {item.imdbID}
                  ftitle = {item.title}
                  fposter = {item.poster}
              /> 
            </div>
        </Paper>
        </Grid>
    ))
    : <p>Nothing found!</p>
    : <p>No item added to favourite list!</p>
    }
  </Grid>
</Container>
        </React.Fragment>
    )
}
