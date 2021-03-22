export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character)
    }

    getAllHouses() {
        return this.getResource(`/houses/`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data'
        }
    }

    _extractId = item => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = char => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = house => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }

    _transformBook = book => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}