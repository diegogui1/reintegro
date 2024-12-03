using mi.factura as my from '../db/schema';

service CatalogService {
    entity factura as projection on my.facturas;
}
