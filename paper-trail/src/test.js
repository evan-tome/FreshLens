const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
test('environment variable is set', () => {
    console.log("GEM2_ACCESS_TOKEN in test:", process.env.GEM2_ACCESS_TOKEN); // Debugging line
    expect(process.env.GEM2_ACCESS_TOKEN).toBeDefined();
});