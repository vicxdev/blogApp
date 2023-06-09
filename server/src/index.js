import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
    try {
        await sequelize.sync({ force: true });
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();