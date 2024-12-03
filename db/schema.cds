namespace mi.factura;

entity facturas {
  key idmsg : String;
    key idfile  : String;
    key idthread  : String;
  nombre_proveedor: String;
  cuit_proveedor: String;
  tipo_servicio: String;
  numero_comprobante: String;
  nombre_cliente: String;
  domicilio_cliente: String;
  monto_total: String;
  nombre_archivo: String;
  fecha_archivo: String;
}

