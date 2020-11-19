/* Home Page JS */
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import FavAction from './FavAction';
import {Helmet} from "react-helmet";

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
        background:'blue',
        borderRadius:0,
        color:'#fff'
      },
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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
      selectMvTy:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }
  }));

export default function HomePage() {
    const classes = useStyles();
    const [searchField, setSearchField] = useState('');
    const [newItems, setNewItems] = useState('Find all movie,series,episode IMDB data here...');
    const [mtype, setType] = useState('');
    const [searchedItems, setSearchedItems] = useState([]);

    const _handleSearchChange = (sValue) => {
        setSearchField(sValue)
      }
    const _handleChange = (event) => {
        setType(event.target.value);
      };

    const _submitSearch = () => {
        setSearchedItems([])
        setNewItems()
        let movie_type = '';
        if(mtype === 'all' || mtype === '' ){
          movie_type = '';
        }else{
          movie_type = `&type=${mtype}`;
        }
        fetch("https://www.omdbapi.com/?s="+searchField+movie_type+"&apikey=fd3a4124")
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.Response === "True"){
                        setSearchedItems(result.Search)
                        setNewItems()
                    }else{
                        console.log("Error : movie not found")
                        setNewItems("Error : movie not found")
                        setSearchedItems([])
                    }
                },
                (error) => {
                  console.log(error)
                  setNewItems(error)
                }
            )
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movie Database </title>
            </Helmet>
            <Container>
            <Grid container spacing={3} justify="center">
                <Paper component="form" className={classes.root}>
                    <TextField 
                        id="searchMovieTxt" 
                        type="text" 
                        placeholder="Search Movie By Name"
                        className={classes.input}
                        onChange ={(event) => _handleSearchChange(event.target.value)} 
                    />
                    <InputLabel id="select-movie-type-label">Select Type</InputLabel>
                    <Select
                          labelId="select-movie-type-label"
                          id="movie-type"
                          onChange={_handleChange}
                          className={classes.selectMvTy}
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="movie">Movies</MenuItem>
                          <MenuItem value="series">Series</MenuItem>
                          <MenuItem value="episode">Episodes</MenuItem>
                    </Select>
                     <IconButton 
                        className={classes.iconButton}
                        aria-label="search"
                        onClick ={() => _submitSearch()}
                        >
                        <SearchIcon /> Search
                    </IconButton>
                </Paper>
            </Grid>
            </Container>  
            <Container className={classes.searchResponseBox}>
                <Grid container  spacing={5} justify="center">
                    { 
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
                              { item.Poster !== 'N/A' ?
                                <img src={item.Poster} alt="Movie Poster" className={classes.gridImg}/>
                                : 'Poster Not Found'
                              }
                                
                            </Link>
                            </div>
                            <div className={classes.gridInfoBox}>
                              <Typography component="h6" className={classes.gridTitle}>
                                {item.Title}
                              </Typography>
                             <FavAction 
                                fitem_id = {item.imdbID}
                                ftitle = {item.Title}
                                fposter = {item.Poster}
                            /> 
                             
                            </div>
                        </Paper>
                        </Grid>
                    ))
                    : <p>{newItems}</p>
                    }
                  </Grid>
            </Container>
        </div>
    )
}
