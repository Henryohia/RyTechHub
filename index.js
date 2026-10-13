const { connectToDatabase, closeDatabase } = require('./src/db');
const {
  ensureCollections,
  createCustomer,
  listCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createSale,
  listSalesForCustomer,
} = require('./src/crm');

async function runDemo() {
  try {
    await connectToDatabase();
    await ensureCollections();

    const customer = {
      name: 'Alicia Johnson',
      email: 'alicia.johnson@example.com',
      phone: '+1-555-123-4567',
      company: 'BrightPath Labs',
      status: 'Active',
    };

    const createdCustomer = await createCustomer(customer);
    const customerId = createdCustomer.insertedId.toString();

    console.log('Customer inserted successfully:');
    console.log(await getCustomerById(customerId));

    const sale = {
      customerId,
      product: 'CRM Pro Subscription',
      amount: 699,
      saleDate: new Date('2026-10-07T12:00:00Z'),
      status: 'Paid',
    };

    const createdSale = await createSale(sale);
    console.log('Sale record created successfully:');
    console.log(createdSale.insertedId.toString());

    console.log('Customer list after insert:');
    console.log(await listCustomers());

    console.log('Sales for the customer:');
    console.log(await listSalesForCustomer(customerId));

    const updatedCustomer = await updateCustomer(customerId, {
      name: 'Dinah Ohia',
      email: 'dinah.ohia@example.com',
      phone: '+1-555-987-6543',
      status: 'VIP',
    });
    console.log('Customer update result:');
    console.log(updatedCustomer.modifiedCount);

    const deleteResult = await deleteCustomer(customerId);
    console.log('Customer deletion result:');
    console.log(deleteResult.deletedCount);

    console.log('CRM database operations completed successfully.');
  } catch (error) {
    console.error('CRM demo failed.');
    const message = String(error.message || '');
    if (/MONGODB_URI is not set/i.test(message)) {
      console.error('Set MONGODB_URI and DB_NAME in the project .env file.');
    } else if (/querySrv|ETIMEOUT|ECONNREFUSED|ENOTFOUND|ENODATA/i.test(message)) {
      console.error('MongoDB Atlas DNS lookup failed. Check MONGODB_DNS_SERVERS in .env against your current network DNS settings.');
    } else if (/Authentication failed|bad auth|authenticat/i.test(message)) {
      console.error('Atlas rejected the database credentials. Check the database username/password in .env.');
    } else {
      console.error(message);
    }
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

runDemo();
