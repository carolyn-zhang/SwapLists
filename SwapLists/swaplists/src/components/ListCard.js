import React, { useState, useEffect } from 'react';
import '../styles/listCard.css';
import ListService from '../services/ListService';
const ListCard = ({list}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        ListService
            .getList(list.listid)
            .then(res => {
                setTitle(res.data.title);
                setDesc(res.data.description);
            })
    })
    return(
        <div className="list-area">
            <i>({list.listid})</i>
            <h3>{title}</h3>
            <div>{desc}</div>
        </div>
    );
}

export default ListCard;