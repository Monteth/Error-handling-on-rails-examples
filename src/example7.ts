import { EitherAsync } from 'purify-ts';
import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): EitherAsync<Error, EmailInfo> => {
    const { firstName, lastName, company } = user;
    const fn = () => new Promise<EmailInfo>(((resolve, reject) => {
        if (firstName && lastName && company) {
            resolve({
                firstName,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
            });
        }
        reject(`Provided user doesn't have valid credentials.`);
    }));
    return EitherAsync.liftPromise(fn);
};
