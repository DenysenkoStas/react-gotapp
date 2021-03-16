import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() { // хук, если произошла ошибка
        this.setState({error: true});
    }

    // переключение случайного персонажа
    toggleRandomChar = () => {
        this.setState(({showRandomChar}) => ({
            showRandomChar: !showRandomChar
        }));
    }

    render() {
        const {showRandomChar, error} = this.state;
        const randomChar = showRandomChar ? <RandomChar/> : null;

        if (error) {
            return <ErrorMessage/> // вывод ошибки
        }

        return (
            <>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                            <button className="btn btn-primary random-btn" onClick={this.toggleRandomChar}>
                                Toggle random character
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};