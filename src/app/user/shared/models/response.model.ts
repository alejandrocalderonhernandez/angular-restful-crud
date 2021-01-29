import { User } from './user.model';
import { Support } from './support.model';

export class Response {
    constructor(public data: Array<User>, 
                public suport: Support,
                public page?: number,
                public total?: number
    ) { }
}