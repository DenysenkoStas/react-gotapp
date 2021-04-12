import React, {useEffect, useState} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './itemList.css';

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getData()
        .then((data) => {
            updateList(data);
            setError(false);
        })
        .catch(() => onError());
    }, [])

    function onError() {
        updateList(null);
        setError(true);
    }

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    if (error) {
        return <ErrorMessage/>
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;