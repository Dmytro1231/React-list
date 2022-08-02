import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Card from './Card';

import style from './Cards.module.scss'

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await API.get('/samples.json');
                setCards(result.data);
            } catch (e) {
                setIsError(true)
            }
            setIsLoading(false);
        }

        fetchData();
    }, []);

    const selectHandler = (event) => {
        const filterCards = cards.filter(card => card.subLabel === event.target.value);
        setFilteredCards(filterCards);
    };

    return (
        <>
            <h1 className={style.title}>Here is the list....</h1>
            <div>
                <h3>Filter your list</h3>
                <select onChange={selectHandler}>
                    {cards.map((options, idx) => (
                        <option key={options.subLabel + idx} value={options.subLabel}>{options.subLabel}</option>
                    ))}
                </select>
            </div>
            <div className={style.wrapper}>
                {isError && <div>Something went wrong ...</div>}
                {
                    isLoading ?
                        (<p>Loading....</p>)
                        :
                        (filteredCards.length ?
                            filteredCards.map((card, idx) => (
                                <Card card={card} key={card.dataUrl + idx} />
                            ))
                            :
                            cards.map((card, idx) => (
                                <Card card={card} key={card.dataUrl + idx} />
                            ))
                        )
                }
            </div>
        </>
    )
}

export default Cards;