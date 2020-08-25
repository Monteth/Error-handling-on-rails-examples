import { Either, Left, Maybe, Right } from 'purify-ts';
import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): Either<Error, EmailInfo> => {
    const { firstName, lastName, company } = user;

    if (firstName && lastName && company) {
        return Right({
            firstName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
        });
    } else {
        return Left(new Error('Provided user doesn\'t have valid credentials.'));
    }
};


export const getEmailInfo2 = (user: User): Either<Error, EmailInfo> =>
    Either.encase(() => {
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
