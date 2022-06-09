const express = require('express');

const app = express();

const baseDir = `${__dirname}/build/`;

app.use(express.static(`${baseDir}`));

app.get('*', (req, res) => res.sendFile('index.html', { root: baseDir }));

// eslint-disable-next-line no-console
app.listen(3000 || process.env.PORT, () => console.log(`Listening on port ${3000 || process.env.PORT}`));