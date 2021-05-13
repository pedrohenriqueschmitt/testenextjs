import React from "react";
import Produto from '../ProdutoGrid';
import If from '../If';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import VoltarIcon from '@material-ui/icons/ArrowBack';
import ProximoIcon from '@material-ui/icons/ArrowForward';
import Link from 'next/link'

export default function ListProdutos(props) {
    if (props.produtos == undefined)
        return <></>
    
    return (
        <>    
            <Grid container spacing={0} justify="space-evenly"
                 alignItems="stretch" style={{marginTop: '10px', paddingBottom: '5px'}}>
                <Grid xs={12} sm={12} md={12} lg={9} xl={9} spacing={0} >
                    <Typography variant="body1" style={{paddingLeft: '10px', paddingTop: '10px'}} gutterBottom><b>{props.titulo}</b></Typography>
                </Grid>

                <Grid container xs={12} sm={12} md={12} lg={9} xl={9} spacing={1} justify="space-evenly">
                    {props.produtos.map((produto) => 
                        <Grid item xs={6} sm={4} md={3} lg={3} xl={3}>
                            <Produto title={produto.nome} id={produto.id} imagem={produto.imagem} precoPrazo={produto.precoPrazo} precoDebito={produto.precoDebito} precoTransfBancaria={produto.precoTransfBancaria} />
                        </Grid>
                    )}
                </Grid>
                <Grid container xs={12} sm={12} md={12} lg={9} xl={9} spacing={1} justify="space-evenly" style={{paddingTop: '30px'}}>
                    <If value={props.pageCurrent > 1}>
                        <Grid item spacing={1} >
                            <Link href={props.urlBack}>
                            <Button variant="contained" color="primary" startIcon={<VoltarIcon />} >
                                Voltar página
                            </Button>
                            </Link>
                        </Grid>
                    </If>
                    
                    <If value={props.hasNext}>
                        <Grid item spacing={1}>
                        <Link href={props.urlNext}>
                            <Button variant="contained" color="primary" endIcon={<ProximoIcon/>} >
                                Próxima página
                            </Button>
                            </Link>
                        </Grid>
                    </If>
                </Grid>
            </Grid>
        </>
    );
}