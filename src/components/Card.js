import React, { useContext } from 'react';
import { ListContext } from '../contexts/Contexts';

const Card = () => {
    const [ list ] = useContext(ListContext);

    return (
        <>
            {list.map(item =>
            // <li onClick={() => {setShowModal({ show: true, id: item.data.id })} } className={`pokemon ${item.data.types[0].type.name}`}>
            <li className={`pokemon ${item.data.types[0].type.name}`}>
                <span class="number">#{item.data.id}</span>
                <span class="name">{item.data.name}</span>

                <div class="detail">
                    <ol class="types">
                    {item.data.types.map(({ type }) => <li class={`type ${type.name}`}>{type.name}</li>)}
                    </ol>

                    <img src={item.data.sprites.other.dream_world.front_default}
                        alt={item.data.name} />
                </div>
            </li>
            )}
        </>
    );
};

export default Card;
