const cds = require('@sap/cds');


module.exports = cds.service.impl(async function () {
    const { factura } = this.entities;


    this.on("READ", factura, async (req, next) => {

        const tx = cds.transaction(req);
        try {


            // Handover to the SF OData Service to fecth the requested data


            const data = await tx.run(SELECT.from("mi_factura_facturas"));
            return data;
        } catch (err) {
            req.error(err.code, err.message);
        }

    });

    this.on("CREATE", factura, async (req, next) => {


        const tx = cds.transaction(req);

        try {
            // const data = await tx.run( await INSERT.into("mi_factura_facturas").entries( req.data));
            // req.res.json(req.data);

            const { idmsg, idfile, idthread } = req.data;

            if (!idmsg || !idfile || !idthread) {
                req.error(400, 'Missing required fields: idmsg, idfile, or idthread.');
            }

            // Si todos los campos están presentes, realiza la inserción en la base de datos
            const result = await tx.run(await INSERT.into("mi_factura_facturas").entries(req.data));
            console.info("insertar datos en sqlite");
            return result;

            // return data.results;
        } catch (err) {

            console.info(err);
            req.res.json(err);

        }

    });




});


