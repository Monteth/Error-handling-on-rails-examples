import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): EmailInfo | null => {
    const { firstName, lastName, company } = user;
    if (firstName && lastName && company) {
        return {
            firstName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
        };
    } else {
        return null;
    }
};

