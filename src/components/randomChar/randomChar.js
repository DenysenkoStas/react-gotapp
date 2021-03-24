import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import './randomChar.css';

export default class RandomChar extends Component {
    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() { // хук появления компонента на странице
        this.updateChar(); // обновление при загрузке страницы
        this.timerId = setInterval(this.updateChar, this.props.interval); // интервал обновления персонажа
    }

    componentWillUnmount() { // хук удаления компонента на странице
        clearInterval(this.timerId); // очистка обновления персонажа при скрытии
    }

    onCharLoaded = char => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25); // рандомное получение id от 25-140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000 // свойство по умолчанию для интервала обновления RandomChar
}

// проверка типов
RandomChar.propTypes = {
    // проверка, что interval - число
    // interval: (props, propName, componentName) => {
    //     const value = props[propName];
    //
    //     if (typeof value === 'number' && !isNaN(value)) {
    //         return null;
    //     }
    //     return new TypeError(`${componentName}: ${propName} must to be a number`);
    // }

    // проверка с помощью библиотеки prop-types
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}