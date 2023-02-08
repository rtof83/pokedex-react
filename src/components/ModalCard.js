import React, { useState, useContext, useEffect } from 'react';
import { ListContext, ShowModalContext } from '../contexts/Contexts';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const ModalCard = () => {
  const [ showModal, setShowModal ] = useContext(ShowModalContext);
  const [ list ] = useContext(ListContext);

  const [ pokemon, setPokemon ] = useState([]);
    
  useEffect(() => {
    setPokemon(list.filter(pokemon => pokemon.data.id === showModal.id));
  }, [showModal.id]);

  return (
      <Modal open={showModal.show}
              onClose={() => setShowModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
      >
      {/* <Box sx={style}> */}
      <Box className='modal'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          list.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>

        {pokemon.length &&
          <div className={`pokemon ${pokemon[0].data.types[0].type.name}`}>
            <span class="name">{pokemon[0].data.name}</span>
          </div>
        }

        <Button variant="contained"
                onClick={() => setShowModal(false)}
          >Voltar
        </Button>
      </Box>
    </Modal>
  );
};

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     height: '50%',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     borderRadius: '1rem',
//     p: 4,
// };

export default ModalCard;