const cds = require('@sap/cds');

const mongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const sMongoUrl = process.env.MONGO_URL;
const sDbName = process.env.BASEDATOS;
const client = new mongoClient(sMongoUrl);

module.exports = cds.service.impl(async function () {
    const { factura } = this.entities;


    this.on("READ", factura, async (req, next) => {


        await client.connect();
        var dataBase = await client.db(sDbName);
        var reintegro = await dataBase.collection("reintegro")

        var iLimit, iOffset, Ofilter;

        iLimit = 9999;
        iOffset = 0;

        var results = await reintegro.find(Ofilter).limit(iLimit + iOffset).toArray();

        return results;

        // const tx = cds.transaction(req);
        // try {


        //     // Handover to the SF OData Service to fecth the requested data


        //     const data = await tx.run(SELECT.from("mi_factura_facturas"));
        //     return data;
        // } catch (err) {
        //     req.error(err.code, err.message);
        // }

    });

    this.on("CREATE", factura, async (req, next) => {


        const tx = cds.transaction(req);

        try {
            // const data = await tx.run( await INSERT.into("mi_factura_facturas").entries( req.data));
            // req.res.json(req.data);

            // const { idmsg, idfile, idthread } = req.data;

            // if (!idmsg || !idfile || !idthread) {
            //     req.error(400, 'Missing required fields: idmsg, idfile, or idthread.');
            // }

            // // Si todos los campos están presentes, realiza la inserción en la base de datos
            // const result = await tx.run(await INSERT.into("mi_factura_facturas").entries(req.data));
            // console.info("insertar datos en sqlite");
            // return result;


            await client.connect();
            var dataBase = await client.db(sDbName);
            var reintegro = await dataBase.collection("reintegro")



            var results = await reintegro.insertOne(req.data);
            if (results.insertedId) {
                req.data.id = results.insertedId;
            }

            return results


            // return data.results;
        } catch (err) {

            console.info(err);
            req.res.json(err);

        }

    });



    this.on("DELETE", factura, async (req, next) => {


        const tx = cds.transaction(req);

        try {
            var data = req.data;
            // const data = await tx.run( await INSERT.into("mi_factura_facturas").entries( req.data));
            // req.res.json(req.data);

            // const { idmsg, idfile, idthread } = req.data;

            // if (!idmsg || !idfile || !idthread) {
            //     req.error(400, 'Missing required fields: idmsg, idfile, or idthread.');
            // }

            // // Si todos los campos están presentes, realiza la inserción en la base de datos
            // const result = await tx.run(await INSERT.into("mi_factura_facturas").entries(req.data));
            // console.info("insertar datos en sqlite");
            // return result;


            await client.connect();
            var dataBase = await client.db(sDbName);
            var reintegro = await dataBase.collection("reintegro")



            var results = await reintegro.deleteOne({
                idmsg: data.idmsg,

                idfile: data.idfile,

                idthread: data.idthread
            });
           

            return results


            // return data.results;
        } catch (err) {

            console.info(err);
            req.res.json(err);

        }

    });

});


