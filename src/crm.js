const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./db');

async function ensureCollections() {
  const db = await connectToDatabase();

  const customerCollections = await db.listCollections({ name: 'customers' }).toArray();
  if (customerCollections.length === 0) {
    await db.createCollection('customers');
  }

  const salesCollections = await db.listCollections({ name: 'sales' }).toArray();
  if (salesCollections.length === 0) {
    await db.createCollection('sales');
  }
}

async function createCustomer(customerData) {
  const db = await connectToDatabase();
  const customer = {
    ...customerData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return db.collection('customers').insertOne(customer);
}

async function listCustomers(filter = {}) {
  const db = await connectToDatabase();
  return db.collection('customers').find(filter).sort({ createdAt: -1 }).toArray();
}

async function getCustomerById(customerId) {
  const db = await connectToDatabase();
  return db.collection('customers').findOne({ _id: new ObjectId(customerId) });
}

async function updateCustomer(customerId, updates) {
  const db = await connectToDatabase();
  const updateDoc = {
    ...updates,
    updatedAt: new Date(),
  };

  return db.collection('customers').updateOne(
    { _id: new ObjectId(customerId) },
    { $set: updateDoc }
  );
}

async function deleteCustomer(customerId) {
  const db = await connectToDatabase();
  return db.collection('customers').deleteOne({ _id: new ObjectId(customerId) });
}

async function createSale(saleData) {
  const db = await connectToDatabase();
  const sale = {
    ...saleData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return db.collection('sales').insertOne(sale);
}

async function listSalesForCustomer(customerId) {
  const db = await connectToDatabase();
  return db.collection('sales').find({ customerId }).sort({ saleDate: -1 }).toArray();
}

module.exports = {
  ensureCollections,
  createCustomer,
  listCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createSale,
  listSalesForCustomer,
  ObjectId,
};
