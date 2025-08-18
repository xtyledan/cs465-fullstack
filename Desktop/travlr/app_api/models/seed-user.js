// Bring in the DB connection and the User schema
const Mongoose = require('./db');
const User = require('./user');

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
            console.log('Email: admin@travlr.com');
            console.log('Password: password123');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Close the MongoDB connection and exit
seedUser().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});