import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharactersPage, HousesPage, BooksPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '../notFound';
import './app.css';

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
            <Router>
                <div className="app">
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
                        <Switch>
                            <Route path='/' exact component={() => <h1 className="title">Welcome to GOT DB</h1>}/>
                            <Route path='/characters' exact component={CharactersPage}/>
                            <Route path='/houses' exact component={HousesPage}/>
                            <Route path='/books' exact component={BooksPage}/>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;
                                    if (match.params)
                                    return <BooksItem bookId={id}/> // отрисовка BooksItem с нужным id
                                }
                            }/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};