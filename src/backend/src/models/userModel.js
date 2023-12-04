export default class User {
  constructor(props) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.birth_date = props.birth_date;
    this.gender = props.gender;
  }
}
