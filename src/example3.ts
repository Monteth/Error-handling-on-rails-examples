import { EmailInfo, User } from './index';

export const getEmailInfo = (user: User): Promise<EmailInfo> => {
    const { firstName, lastName, company } = user;
    return new Promise(((resolve, reject) => {
        if (firstName && lastName && company) {
            return resolve({
                firstName,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}`
            });
        } else {
            return reject(`Provided user doesn't have valid credentials.`);
        }
    }));
};
