import { EmailInfo, User } from './index';
export class CustomError extends Error {
    foo: string[];
    constructor (faultyCredentials: string[] = [], ...params: any[]) {
        super(...params);

        this.foo = faultyCredentials;
    }
}
export const getEmailInfo = (user: User): EmailInfo => {
    const { firstName, lastName, company } = user;
    if (firstName && lastName && company) {
        return {
            firstName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
        };
    } else {
        throw new CustomError(['lastName'], 'Provided user doesn\'t have valid credentials.');
    }
};
