import { testConnection, initializeDatabase } from './init.js';

const test = async () => {
  console.log('Testing database connection...\n');
  
  try {
    const connected = await testConnection();
    
    if (connected) {
      console.log('\n✅ Database connection successful!');
      console.log('\nInitializing schema...');
      await initializeDatabase();
      console.log('\n✅ All tests passed! Database is ready.');
    } else {
      console.log('\n❌ Database connection failed.');
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    process.exit(0);
  }
};

test();
