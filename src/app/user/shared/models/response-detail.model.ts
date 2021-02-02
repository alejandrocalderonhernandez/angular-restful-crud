import { User } from './user.model';
import { Support } from './support.model';

export class ResponseDetail {
    constructor(public data: User, 
                public suport: Support
    ) { }
}