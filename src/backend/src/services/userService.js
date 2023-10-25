export class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  // os tratamentos de exceções devem ser realizados
  async create({ username, email, password, birth_date, gender }) {
    return this.repository.create({
      username,
      email,
      password,
      birth_date,
      gender,
    });
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const user = await this.repository.findById(id);
    return user;
  }

  async findByUsername(username) {
    const user = await this.repository.findByUsername(username);
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);
    return user;
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async update(id, userDto) {
    await this.findById(id);
    return this.repository.update(id, userDto);
  }
}
