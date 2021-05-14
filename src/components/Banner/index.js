import React from 'react';
import Grid from '@material-ui/core/Grid';
import Banner_Principal from '../../img/Banner/Principal.png';

export default function Categoria() {

    return (
        <>
            <Grid container spacing={1} justify="space-evenly"
                alignItems="flex-start">
                <Grid item xs={12} spacing={10} justify="space-evenly"
                    alignItems="flex-start" style={{
                        background: '50% 50% no-repeat',
                        width: '300px',
                    }}>
                    <img style={{ width: "100%" }} src={Banner_Principal} />
                </Grid>
            </Grid>

        </>
    );
}