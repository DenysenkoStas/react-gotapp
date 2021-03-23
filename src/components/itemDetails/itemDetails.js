import React, {Component} from 'react';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {
    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) { // сравнение с предыдущем пропсом при обновлении компонента
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = item => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return null;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then((item) => this.onItemDetailsLoaded(item))
            .catch(() => this.onError());
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }

    render() {
        const {item, loading, error} = this.state;

        if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <span className='select-error'>Please select a character</span>
        }

        if (loading) {
            return (
                <div className="item-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name} = item;
        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })}
                </ul>
            </div>
        );
    }
}