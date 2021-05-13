import React from "react";
import Card from '../Card';
import Paper from '../Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Secoes(props) {
    console.log(props.secoes);
    return (
        <>           
            <Grid container spacing={0} justify="space-evenly"
                alignItems="flex-start">
                <Grid container item xs={12} sm={12} md={12} lg={9} xl={9}  spacing={0} justify="space-evenly"
                    alignItems="flex-start">
                    
                    <Grid item xs={12} sm={12}>
                        <Typography variant="body1" style={{paddingLeft: '10px', paddingTop: '10px'}} gutterBottom><b>Categorias</b></Typography>
                    </Grid>
                    
                     {props.secoes.map((categoria) =>
                        <Grid item xs={6} sm={4} md={2} lg={2} xl={2}>
                            <Paper title={categoria.descricao} src={categoria.id} href={`/produtos?categoria=${categoria.descricao}`}/>
                            
                        </Grid> 
                    )}

                    
                   {/*
                    <Grid item xs={12} sm={12}>
                        <Typography variant="body1" color="primary" style={{paddingLeft: '10px', paddingTop: '10px'}} gutterBottom><b>Destaque</b></Typography>
                    </Grid>
                    <Grid container spacing={1} justify="space-evenly"
                        alignItems="flex-start">
                        <Grid item xs={12} spacing={10} justify="space-evenly"
                            alignItems="flex-start" style={{  background: 'url(blah.jpg) 50% 50% no-repeat',
                                width: '300px',
                                }}>
                            <img style={{ width: "100%"}} src="https://image.freepik.com/fotos-gratis/capacete-e-tijolos_102671-6086.jpg" />
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid> 
        </>
    );
}