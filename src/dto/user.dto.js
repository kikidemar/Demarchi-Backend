class UserDTO {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.photo = user.photo;
    this.last_connection = user.last_connection;
    this.email = user.email;
    this.role = user.role;
    this.cid = user.cid;
  }
}

export default UserDTO;
