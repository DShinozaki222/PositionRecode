export class User {

    private _userName = '';
    public get userName(): string {
        return this._userName;
    }

    private _mail = '';
    public get mail(): string {
        return this._mail;
    }

    constructor(name: string, mail: string) {
        this._userName = name;
        this._mail = mail
    }

}
