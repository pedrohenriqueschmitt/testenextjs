import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleCartIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';

export default function Quantidade(props) {
    //const [quantidade, setQuantidade] = React.useState(1);
    
    const handleChange_Quantidade = (valor) => {
        var newValor = props.quantidade+valor;
        if (newValor < 0)
            return;
        props.setQuantidade(newValor);
      }

    return (
        <>

                        <IconButton color="" aria-label="add to shopping cart" onClick={() => handleChange_Quantidade(-1)}>
                            <RemoveCircleCartIcon />
                        </IconButton>
                        
                        <Typography color="" variant="h5" style={{paddingLeft: '10px', paddingRight: '10px'}}>{props.quantidade}</Typography>
                        
                        <IconButton color="" aria-label="add to shopping cart" onClick={() => handleChange_Quantidade(1)}>
                            <AddShoppingCartIcon />
                        </IconButton>
        </>
    );
}