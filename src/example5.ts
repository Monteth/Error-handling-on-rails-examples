import { Just, Maybe, Nothing } from 'purify-ts';
import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): Maybe<EmailInfo> => {
    const { firstName, lastName, company } = user;

    if (firstName && lastName && company) {
        return Just({
            firstName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
        });
    } else {
        return Nothing;
    }
};

export const getEmailInfo2 = (user: User): Maybe<EmailInfo> =>
    Maybe.encase(() => {
        const { firstName, lastName, company } = user;
        if (firstName && lastName && company) {
            return {
                firstName,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
            };
        } else {
            throw new Error('Provided user doesn\'t have valid credentials.');
        }
    });
