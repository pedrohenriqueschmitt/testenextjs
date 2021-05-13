import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import _ from 'underscore';
import Link from 'next/link'
import * as gtag from '../../lib/gtag'

const images = [
    { id: 2, img: require(`../../img/Secoes/2.png`) },
    { id: 3, img: require(`../../img/Secoes/3.png`) },
    { id: 4, img: require(`../../img/Secoes/4.png`) },
    { id: 5, img: require(`../../img/Secoes/5.png`) },
    { id: 6, img: require(`../../img/Secoes/6.png`) },
    { id: 7, img: require(`../../img/Secoes/7.png`) },
    { id: 9999, img: require(`../../img/Secoes/9999.png`) }
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.8),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paper: {
        width: '100%',
        height:"80px"
    }
}));

export default function SimplePaper(props) {
    const classes = useStyles();
    const [loadImagem, setloadImagem] = useState();

    const load = async () =>{
        try{
            const i = _.findWhere(images, {id: props.src});
            setloadImagem(i.img)
        }catch(e){
            console.log(`Imagem não encontrada! ${e}`)
        }
    };
    
    useEffect(() => {
        load();
    }, [props.id]);

    return (
        <div className={classes.root} >
            <Paper className={classes.paper} style={{borderRadius: '5px'}}>
                
                <Link href={props.href}>
                             
                    <ButtonBase  style={{ width: "100%", height:"100%" , borderRadius: '5px', alignItems: 'flex-end' }} >
                    
                        <img style={{ width: "100%", height: "100%", borderRadius: '5px' }} src={loadImagem} />
                        
                        {(props.title? <Typography variant="subtitle1" style={{ color: '#fFfffF', position: 'absolute', top: '10px', left: '10px'}}>{props.title}</Typography>:<></> )
                        }

                    </ButtonBase>
                </Link>
            </Paper>
        </div>
    );
}