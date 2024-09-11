const { Client } = require('pg');

module.exports = async function (context, req) {
    const client = new Client({
        user: "hspadmin",
        host: "gxmdevdb.postgres.database.azure.com",
        database: "gxmuserdb",
        password:"Aug@2024",
        port: "5432",
        ssl: {
                rejectUnauthorized: false // For testing; in production, use the correct CA certificate
            }
       
    });

    try {
        
        await client.connect();
        const query = 'SELECT * FROM test_companies';
        context.log.info(`After Query Execution `);
        const result = await client.query(query);
        context.log.info(`After result  mapping `);
        context.res = {
            status: 200,
            body: result.rows
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Error fetching Comapny::: ${err.message}`
        };
    } finally {
        await client.end();
    }
};
