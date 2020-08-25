import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): EmailInfo => {
    const { firstName, lastName, company } = user;
    if (firstName && lastName && company) {
        return {
            firstName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
        };
    } else {
        throw new Error('Provided user doesn\'t have valid credentials.');
    }
};
