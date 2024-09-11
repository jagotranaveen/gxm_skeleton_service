const { Client } = require('pg');

module.exports = async function (context, req) {
    const client = new Client({
        __commented_user: process.env.PGUSER,
        __commented_host: process.env.PGHOST,
        __commented_database: process.env.PGDATABASE,
        __commented_password: process.env.PGPASSWORD,
        __commented_port: process.env.PGPORT,
        user: "hspadmin",
        host: "gxmdevdb.postgres.database.azure.com",
        database: "gxmuserdb",
        password:"Aug@2024",
        port: "5432",
        ssl: {
                rejectUnauthorized: false // For testing; in production, use the correct CA certificate
            }
    });

    const { name, address } = req.body;

    if (!name || !address) {
        context.res = {
            status: 400,
            body: "Please provide company name and address"
        };
        return;
    }

    try {
        context.log.info(`process.env.PGHOST: = ${process.env.PGHOST}, process.env.PGDATABASE = ${process.env.PGDATABASE}`);
        await client.connect();
        context.log.info(`After Connect: Name = ${name}, Role = ${address}`);
        const query = 'INSERT INTO test_companies(name, address) VALUES($1, $2)';
        context.log.info(`After Insert: Name = ${name}, Role = ${address}`);
        await client.query(query, [name, address]);
        context.res = {
            status: 201,
            body: `Company '${name}' inserted successfully`
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Error inserting company::: ${err.message}`
        };
    } finally {
        await client.end();
    }
};
