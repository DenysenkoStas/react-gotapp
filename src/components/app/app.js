import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

export default class App extends Component {
    gotService = new gotService();

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
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={item => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={item => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};