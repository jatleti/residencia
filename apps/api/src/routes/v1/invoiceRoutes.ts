import express from 'express';
import { InvoiceController } from '../../controllers/invoiceController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const invoiceController = new InvoiceController();
const invoiceRouter = express.Router();

// base URL: /invoice
invoiceRouter
    .get('', checkPermissions([Permissions.INVOICE.LIST]), invoiceController.list)
    .get('/:id', checkPermissions([Permissions.INVOICE.VIEW]), invoiceController.get)
    .post('', checkPermissions([Permissions.INVOICE.CREATE]), invoiceController.add)
    .patch('/:id', checkPermissions([Permissions.INVOICE.EDIT]), invoiceController.set)
    .delete('/:id', checkPermissions([Permissions.INVOICE.DELETE]), invoiceController.del);

export { invoiceRouter };
