const express = require('express');

const app = express();

const baseDir = `${__dirname}/build/`;

app.use(express.static(`${baseDir}`));

app.get('*', (req, res) => res.sendFile('index.html', { root: baseDir }));

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`));