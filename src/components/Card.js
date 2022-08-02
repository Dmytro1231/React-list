import React from 'react'

import style from './Card.module.scss';

const Card = ({ card }) => {
    return (
        <>
            <div className={style.cardItem}>
                <img src={card.imageUrl} alt={card.imageUrl} />
                <p className={style.description}>{card.description}</p>
                <div className={style.labelWrapper}>
                    <p>Label: {card.label}</p>
                    <p>SubLabel: {card.subLabel}</p>
                </div>
            </div>
        </>
    )
}

export default Card;