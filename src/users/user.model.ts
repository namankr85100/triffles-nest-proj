export class User {
  constructor(
    // public userId: number, //TODO:will use uuid for here for insertion
    public email: string,
    public password: string,
    public profile: number,
    public isAdmin: boolean
  ) {}
}
