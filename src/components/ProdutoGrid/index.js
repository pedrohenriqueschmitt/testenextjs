import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router'
import If from '../If'
import Link from 'next/link'
import { isEmpty } from 'underscore';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.8),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
        height: "100%"
    },
    paper: {
        width: '100%',
        height: "100%"
    }
}));

export default function Produto(props) {
    const router = useRouter()
    const classes = useStyles();
    const [loadImagem, setloadImagem] = useState();

    console.log(props.imagem);
    const load = () =>{
        try{
            if (!isEmpty(props.imagem) && props.imagem != undefined)
                setloadImagem(props.imagem);
            else
                setloadImagem(require(`../../img/Produtos/erro.png`));
            //setloadImagem(require(`../../img/Produtos/${props.id}${props.imagem}`));
            //
        }catch(e){
            console.log('Imagem não encontrada!')
            setloadImagem(require(`../../img/Produtos/erro.png`));
        }
    };

    const formartValue = (valor) => {
        var c = valor.split(',');
        return <b><font style={{ fontSize: 'initial' }}>R$</font> {c[0]},<sup style={{fontSize: 'small'}}>{c[1]}</sup></b>
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className={classes.root} >

            <Paper className={classes.paper} style={{
                borderRadius: '5px',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
            }}>
                <Link href={`/produto/${props.title}?id=${props.id}`}>
                <ButtonBase style={{ width: "100%", height: "100%", borderRadius: '5px' }}>

                    <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12} >
                            <img style={{ width: "100%", borderRadius: '5px 5px 0px 0px' }} src={loadImagem} />
                        </Grid>
                        <Grid item xs={12} justify="center" alignItems="flex-start" style={{ /*height: '50px'*/ }}>
                            <Typography variant="subtitle1" style={{ color: '#00000', top: '10px' }}>{props.title}</Typography>

                        </Grid>
                        <Grid item xs={12} justify="center" alignItems="flex-start">
        
                            <If value={props.precoPrazo}>
                                <Typography variant="h6" gutterBottom>{formartValue(props.precoPrazo)}</Typography>
                                <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic'}}>Pagando a vista, ganhe desconto!</Typography>
                            </If>

                            
                            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} spacing={1} justify="space-evenly" style={{marginRight: '0px',
    marginLeft: '0px'}}>
                                <Grid item xs={6} justify="center" alignItems="flex-start" style={{
                                    borderColor: 'white',
                                    borderStyle: 'solid',
                                    backgroundColor: '#ffc72c2e'
                                }}>
                                    <If value={props.precoDebito}>
                                        <Typography color="primary" gutterBottom variant="h5">{formartValue(props.precoDebito)}</Typography>
                                        <Typography color="primary" gutterBottom variant="subtitle2" ><b>Cartão débito</b></Typography>
                                    </If>
                                </Grid>
                                <Grid item xs={6} justify="center" alignItems="flex-start" style={{
                                    borderColor: 'white',
                                    borderStyle: 'solid',
                                    backgroundColor: '#ffc72c2e'
                                }}>
                                    <If value={props.precoTransfBancaria}>
                                        <Typography color="primary" gutterBottom variant="h5">{formartValue(props.precoTransfBancaria)}</Typography>
                                        <Typography color="primary" gutterBottom variant="subtitle2" ><b>Transf. Bancária</b></Typography>
                                    </If>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </ButtonBase>
                </Link>
                <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12} spacing={0}>
                    <Link href={`/produto/${props.title}?id=${props.id}`}>
                        <Button size="large" variant="contained" style={{ width: "100%" }} color="secondary">{(props.precoPrazo?'Comprar':'Ver detalhes')}</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}