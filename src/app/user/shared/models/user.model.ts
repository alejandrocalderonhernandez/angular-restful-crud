import { UserModel } from './user.model.abstract';

export class User implements UserModel {
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public photo: string
    ) { }
}