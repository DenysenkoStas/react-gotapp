import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component {
    state = {
        showRandomChar: true
    }

    // переключение случайного персонажа
    toggleRandomChar = () => {
        this.setState(({showRandomChar}) => ({
            showRandomChar: !showRandomChar
        }));
    }

    render() {
        const {showRandomChar} = this.state;
        const randomChar = showRandomChar ? <RandomChar/> : null;

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
                    <Row>
                        <Col md='6'>
                            <ItemList/>
                        </Col>
                        <Col md='6'>
                            <CharDetails/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};