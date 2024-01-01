// functions/invoices.js

const { PrismaClient } = require('@prisma/client');
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// CORS middleware (place it before your route handlers)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.post('/invoices', async (req, res) => {
  try {
    console.log('POST /invoices - Request received'); // Add this line
    const { invoiceNumber, amountDinar, amountUS, amountRNB, customerNumber, notes, swift, date } = req.body;

    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        amountDinar,
        amountUS,
        amountRNB,
        customerNumber,
        notes,
        swift,
        date,
      },
    });

    res.json(newInvoice);
    console.log('POST /invoices - Response sent'); // Add this line
    console.log("Invoice created successfully");
    console.log(newInvoice);
  } catch (error) {
    console.error('Error adding new invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... other route handlers (GET, PUT, DELETE) ...



module.exports = app;
module.exports.handler = serverless(app);