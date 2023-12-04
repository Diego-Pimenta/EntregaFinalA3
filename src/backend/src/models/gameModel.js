export default class Game {
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.genre = props.genre;
    this.price = props.price;
    this.developed_by = props.developed_by;
    this.release_date = props.release_date;
  }
}
