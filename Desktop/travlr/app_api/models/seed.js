// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');
const User = require('./user');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Trip data seeded successfully');
};

// Create default admin user
const seedUser = async () => {
    try {
        // Check if admin user already exists
        const existingUser = await User.findOne({ email: 'admin@travlr.com' });
        
        if (!existingUser) {
            // Create new admin user
            const adminUser = new User({
                email: 'admin@travlr.com',
                name: 'Admin User'
            });
            
            // Set password (this will hash it with salt)
            adminUser.setPassword('password123');
            
            // Save user to database
            await adminUser.save();
            console.log('Default admin user created successfully');
            console.log('Login credentials:');
            console.log('  Name: Admin User');
            console.log('  Email: admin@travlr.com');
            console.log('  Password: password123');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Run both seed functions
const runSeed = async () => {
    await seedDB();
    await seedUser();
};

// Close the MongoDB connection and exit
runSeed().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
