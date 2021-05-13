import React, {useEffect, useState} from 'react';
import Quantidade from '..//Quantidade';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import If from '../If';
import ImagemSlide from '../ImagemSlide';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
}));

export default function Produto(props) {
    const classes = useStyles();
    const [quantidade, setQuantidade] = React.useState(1);

    const [loadImagem, setloadImagem] = useState();

    const handleClick = () => {
        window.location.assign(`https://wa.me/5547991490220?text=Olá,%20gostaria%20de%20${quantidade}%20%20${props.nome}`);
    }

    const load = () =>{
        try{
            setloadImagem(require(`../../img/Produtos/${props.id}${props.imagem}`));
        }catch(e){
            console.log(`Imagem não encontrada! ${e}`)
            setloadImagem(require(`../../img/Produtos/erro.png`));
        }
    };

    const formartValue = (valor) => {
        var c = valor.split(',');
        return <b><font style={{ fontSize: 'initial' }}>R$</font> {c[0]},<sup style={{fontSize: 'small'}}>{c[1]}</sup></b>
    }
    
    useEffect(() => {
        load();
    }, [props.id]);

    return (
        <>
            <Grid container spacing={0} justify="center"
                alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4} justify="space-evenly"
                    alignItems="flex-start" style={{
                        background: '50% 50% no-repeat',
                        width: '300px',
                    }}>
                    {/* <img style={{ width: "100%" }} src={loadImagem} /> */}
                    <ImagemSlide />
                </Grid>


                <Grid container item xs={12} sm={12} md={12} lg={5} xl={5} spacing={2} justify="space-evenly"
                    alignItems="flex-start" style={{
                        //background: 'white',
                        marginLeft: '6px',
                        //marginTop: '10px',
                    }}>
                    <Grid item xs={12} sm={12} >

                        <Typography variant="h5" style={{ paddingTop: '10px' }} gutterBottom><b>{props.nome}</b></Typography>
                        <Typography variant="subtitle1" gutterBottom>{props.descricao}</Typography>
                    </Grid>

                    {/* <Grid item xs={12} sm={12} >
                        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Cor</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={props.cor}
                                onChange={props.handleChange_Cor}
                                label="Cor"
                            >
                                <MenuItem value={10}>Preto</MenuItem>
                                <MenuItem value={20}>Vermelho</MenuItem>
                                <MenuItem value={30}>Verde</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Tamanho</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={props.tamanho}
                                onChange={props.handleChange_Tamanho}
                                label="Tamanho"
                            >
                                <MenuItem value={10}>1 litro</MenuItem>
                                <MenuItem value={20}>2 litro</MenuItem>
                                <MenuItem value={30}>5 litros</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}


                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <Typography color="primary" variant="h5" style={{ paddingLeft: '10px', paddingTop: '10px' }} gutterBottom>{formartValue(props.precoPrazo)}</Typography>
                    </Grid>

                    <Grid container xs={6} justify="center" direction="row"
                        alignItems="center" direction="row" style={{ paddingRight: '10px' }}>
                        <Quantidade quantidade={quantidade} setQuantidade={setQuantidade}/>

                    </Grid>

                    <Grid container xs={12} justify="center" alignItems="center" sytle={{paddingTop: '25px'}}>
        
                        <If value={props.precoPrazo}>
                            <Typography variant="h6" gutterBottom style={{ fontStyle: 'italic'}}>Pagando a vista, ganhe desconto!</Typography>
                        </If>

                        
                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} spacing={1} justify="space-evenly" style={{marginRight: '0px', marginLeft: '0px'}}>
                            <Grid item xs={6} justify="center" alignItems="center" style={{
                                borderColor: 'white',
                                borderStyle: 'solid',
                                backgroundColor: '#ffc72c2e',
                                textAlign: 'center'
                            }}>
                                <If value={props.precoDebito}>
                                    <Typography color="primary" gutterBottom variant="h5">{formartValue(props.precoDebito)}</Typography>
                                    <Typography color="primary" gutterBottom variant="subtitle1" ><b>Cartão débito</b></Typography>
                                </If>
                            </Grid>
                            <Grid item xs={6} justify="center" alignItems="flex-start" style={{
                                borderColor: 'white',
                                borderStyle: 'solid',
                                backgroundColor: '#ffc72c2e',
                                textAlign: 'center'
                            }}>
                                <If value={props.precoTransfBancaria}>
                                    <Typography color="primary" gutterBottom variant="h5">{formartValue(props.precoTransfBancaria)}</Typography>
                                    <Typography color="primary" gutterBottom variant="subtitle1" ><b>Transf. Bancária</b></Typography>
                                </If>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5} justify="center" alignItems="center" style={{ paddingRight: '10px' }}>
                        {/* <Button size="large" variant="contained" style={{ width: "100%", }} color="secondary" onClick={props.onClickComprar}>Comprar</Button> */}
                        <Button size="large" startIcon={<WhatsAppIcon/>} variant="contained" style={{ width: "100%",textTransform: 'none', background: 'green',  color: 'white' }} onClick={handleClick}>Comprar pelo WhatsApp</Button>
                    </Grid>
                    {/* <Grid item xs={12} sm={2} justify="center"
                        alignItems="center" style={{paddingRight: '10px'}}>
                        <Button size="large" variant="outlined" style={{width: "100%"}} color="primary">Retirar na loja</Button>
                    </Grid> */}
                </Grid>


                <Grid container item xs={12} sm={12} md={12} lg={9} xl={9} spacing={2} justify="space-evenly"
                    alignItems="center" justify="center" style={{ paddingTop: "10px" }}>
                    <Grid item xs={12} sm={12} >
                        <Typography variant="subtitle1" style={{ paddingLeft: '10px', paddingTop: '10px' }} ><b>Formas de pagamento</b></Typography>
                        <Typography variant="body1" style={{ paddingLeft: '10px', paddingTop: '10px' }} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Typography variant="subtitle1" style={{ paddingLeft: '10px', paddingTop: '10px' }} ><b>Entregas</b></Typography>
                        <Typography variant="body1" style={{ paddingLeft: '10px', paddingTop: '10px' }} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.</Typography>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
}