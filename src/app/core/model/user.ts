export class User {
    username?: string;
    password?: string;

    constructor(data?: any) {
        if (data) {
            this.username = data.username;
            this.password = data.password;
        }
    }
}