import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

export default class CharacterPage extends Component {
    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() { // хук, если произошла ошибка
        this.setState({error: true});
    }

    // передача id песонажа по клику
    onCharSelected = id => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        const {selectedChar, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={selectedChar}/>
                </Col>
            </Row>
        )
    }
}