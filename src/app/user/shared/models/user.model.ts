export class User {

    constructor(
        public id: number,
        public firstame?: string,
        public lastName?: string,
        public email?: string,
        public job?: string,
        public photo?: string,
        public createAt?: string
    ) {

    }
}