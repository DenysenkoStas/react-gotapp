import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() { // хук, если произошла ошибка
        this.setState({error: true});
    }

    // передача id песонажа по клику
    onItemSelected = id => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        const {selectedChar, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <CharDetails charId={selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}