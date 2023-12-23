import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
