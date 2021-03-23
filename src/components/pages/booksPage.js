import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component {
    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch() { // хук, если произошла ошибка
        this.setState({error: true});
    }

    render() {
        const {error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId) // переход на страницу с книгой
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}
            />
        )
    }
}

export default withRouter(BooksPage); // использование withRouter