import { EmailInfo } from './index';

export const sendEmail = (data: EmailInfo) => {
    console.log(`
TO: ${data.email}
    Dear ${data.firstName},
    Please pay off your bills...
`);
};
