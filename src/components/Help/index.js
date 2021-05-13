import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Help() {
    const [buscar, setBuscar] = React.useState('');
    const router = useRouter()

    return (
        <>
            <Grid container spacing={1} justify="space-evenly"
                alignItems="flex-start" style={{ paddingTop: '8px',paddingBottom: '12px' }}>

                <Grid container item xs={12} spacing={0} justify="space-evenly"
                    alignItems="flex-start" >
                    <Grid item xs={12} sm={6} >
                        <Typography variant="h6" align="center" gutterBottom>Digite aqui, o que você procura</Typography>
                    </Grid>
                </Grid>

                <Grid container item xs={12} spacing={2} justify="space-evenly"
                    alignItems="center" justify="center" style={{
                        paddingTop: '0px',
                    }}>
                    <Grid container item xs={12} sm={12} md={6} lg={4} xl={4} >
                        <TextField id="outlined-search" value={buscar} onChange={(event) => setBuscar(event.target.value)} label="Preciso de" type="search" variant="outlined" color="primary" style={{ width: '100%' }} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} justify="center"
                    alignItems="center" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <Grid container item xs={12} sm={12} md={6} lg={4} xl={4}  >
                        <Link href={`/produtos?buscarPor=${buscar}`}>
                            <Button size="large" variant="contained" style={{ width: "100%" }} startIcon={<AddShoppingCartIcon />} color="primary" >Procurar</Button>
                            </Link>
                    </Grid>
                </Grid>
                
            </Grid>
        </>
    );
}