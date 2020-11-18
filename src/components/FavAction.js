import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    gridIconBtn:{
        fontSize:'14px'
      }
}));

export default function FavAction({fitem_id, ftitle, fposter}) {
    //console.log(`i_id:${fitem_id}`)
    const classes = useStyles();
    const[isFav, setIsFav] = useState(false)

    useEffect(() => {
        const myCFavList  = JSON.parse(localStorage.getItem("myFavListIds"));
        function chekFav(){  
        if (localStorage.getItem("myFavListIds") != null) {
            if(myCFavList.length > 0 ){
                if(myCFavList.includes(fitem_id)){
                    setIsFav(true)
                }
            }
        }else{
            //setIsFav(false)
        }
        }
        chekFav()
    }, [fitem_id])

    

  const _add_to_fav_list =  (id, title, poster) => {
    try {
      
        let movieDataId = id;
        let movieData = {
            "imdbID" : id,
            "title"  : title,
            "poster" : poster,
        }
        
        const myFavListIdsArr = JSON.parse(localStorage.getItem("myFavListIds") || "[]");
        const myFavListArr = JSON.parse(localStorage.getItem("myFavList") || "[]");
        let filteredThatArray = '';
        var dataExist = 'no';
        if(myFavListIdsArr.length > 0 ){
            
            if(myFavListIdsArr.includes(id)){
                dataExist = 'yes';
                filteredThatArray = myFavListIdsArr.filter((i) => i !== id)
            }
            for(var f=0; f < myFavListArr.length; f++ ){
                if(myFavListArr[f].imdbID === id){
                  myFavListArr.splice(f, 1);
                  break;
                }
              }
        }
        if(dataExist === 'yes'){
          localStorage.setItem("myFavListIds", JSON.stringify(filteredThatArray));
          localStorage.setItem("myFavList", JSON.stringify(myFavListArr));
          //console.log('already in fav list!')
          setIsFav(false)
        }else{
          myFavListIdsArr.push(movieDataId);
          myFavListArr.push(movieData);
          localStorage.setItem("myFavListIds", JSON.stringify(myFavListIdsArr));
          localStorage.setItem("myFavList", JSON.stringify(myFavListArr));
          //console.log('added in fav list!')
          setIsFav(true)
        }
       
    } catch(error) {
        console.log(error)
    }
  }

    return (
        <div>
            <IconButton
            className={classes.gridIconBtn}
            aria-label="make_fav"
            onClick ={() => _add_to_fav_list(fitem_id, ftitle, fposter)}
          >
          { isFav ? <FavoriteIcon color={"secondary"} /> : <FavoriteBorderIcon />  }
        </IconButton>
        </div>
    )
}
