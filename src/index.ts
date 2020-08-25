import { EitherAsync, Left, Maybe, MaybeAsync, Right } from 'purify-ts';
import * as Example1 from './example1';
import * as Example2 from './example2';
import * as Example3 from './example3';
import { CustomError } from './example4';
import * as Example4 from './example4';
import * as Example5 from './example5';
import * as Example6 from './example6';
import * as Example7 from './example7';


export type User = {
    id: string;
    firstName: string;
    lastName: string;
    company: string;
};

export type EmailInfo = {
    firstName: string;
    email: string;
};

const legitUser: User = {
    id: '0',
    firstName: 'Konrad',
    lastName: 'Bosak',
    company: 'vazco.eu',
};

const faultyUser: User = {
    id: '1',
    firstName: 'John',
    lastName: '',
    company: 'vazco.eu',
};

const user: User = Math.random() >= 0.5 ? legitUser : faultyUser;

// Example1.getEmailInfo(legitUser); // { firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' }
// Example1.getEmailInfo(faultyUser); // null

const ex1 = Example1.getEmailInfo(user);
if (ex1 !== null) {
    // ok
} else {
    // error
}

// Example2.getEmailInfo(legitUser); // { firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' }
// Example2.getEmailInfo(faultyUser); // throws Error: Provided user doesn't have valid credentials.

try {
    const ex2 = Example2.getEmailInfo(user);
    // ok
} catch (e) {
    // error
}

// Example3.getEmailInfo(legitUser); // Promise { { firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' } }
// Example3.getEmailInfo(faultyUser); // Promise { <rejected> "Provided user doesn't have valid credentials." }

Example3.getEmailInfo(user)
    .then(r => { /* ok */})
    .catch(e => { /* error */});

// Example4.getEmailInfo(legitUser); // { firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' }
// Example4.getEmailInfo(faultyUser); // throws CustomError: Provided user doesn't have valid credentials. + ['lastname']

try {
    const ex4 = Example4.getEmailInfo(user);
    // ok
} catch (e) {
    if (e instanceof CustomError) {
        // error
    }
}

// Example5.getEmailInfo(legitUser); // Just ({ firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' })
// Example5.getEmailInfo(faultyUser); // Nothing

Example5.getEmailInfo(user)
    .caseOf({
        Just: (value) => { /* OK */
        },
        Nothing: () => { /* Error */
        },
    });

Example5.getEmailInfo(user)
    .map((r) => {
        /* OK */
        return r.email.length;
    })
    .orDefault(0);


// Example6.getEmailInfo(legitUser); // Right ({ firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' })
// Example6.getEmailInfo(faultyUser); // Left (''Provided user doesn't have valid credentials.')

Example6.getEmailInfo(user)
    .caseOf({
        Left: (value) => { /* OK */ },
        Right: () => { /* Error */ },
    });

Example6.getEmailInfo(user)
    .map(emailInfo => {
        /* OK */
        return emailInfo.email.length;
    })
    .mapLeft(error => {
        /* Error */
        return { code: 404, error };
    })
    .orDefault(0);

// Example7.getEmailInfo(legitUser); // EitherAsync Right ({ firstName: 'Konrad', email: 'konrad.bosak@vazco.eu' })
// Example7.getEmailInfo(faultyUser); // EitherAsync Left (''Provided user doesn't have valid credentials.')

Example7.getEmailInfo(user)
    .map( r => {
        /* OK */
        return r;
    })
    .mapLeft(error => {
        /* Error */
        return error;
    })
    .chain(r => {
        /* OK */
        /* Call db */
        /* returns OK or Error wrapped in EitherAsync */
        /* depending on call result */
        // return EitherAsync.liftEither(Left(r));
        return EitherAsync.liftEither(Right(r));
    })
    .chainLeft(r => {
        /* Error */
        /* Call db */
        /* returns OK or Error wrapped in EitherAsync */
        /* depending on call result */
        // return EitherAsync.liftEither(Right(r));
        return EitherAsync.liftEither(Left(r));
    })
    .run() // promise
    .then(syncEither => {/* like sync Either */});
