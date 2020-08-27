const express = require('express');
const port = process.env.PORT || 3003;
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');												   
const app = express();
const Products = require('./routes/products');
const voyageDetails = require('./routes/voyageDetails');
const vesselDetails = require('./routes/vesselDetails');
const userDetails = require('./routes/userDetails');
const performanceDetails = require('./routes/performanceDetails');
const voyageDocuments = require('./routes/voyageDocuments');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('./config');
app.use(helmet());
const url = config.mongoURI;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bulkShiping').then((
    () => {
        console.log('mongo bd connected')
    }
)).catch(e => console.log('error'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
// ... other app.use middleware 
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-f01szrz0.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO',
    issuer: `https://dev-f01szrz0.auth0.com`,
    algorithms: ['RS256']
});
// app.use(checkJwt);


app.use('/products', Products);
app.use('/userDetails', userDetails);
app.use('/vesselDetails', vesselDetails);
app.use('/voyageDetails', voyageDetails);
app.use('/performanceDetails', performanceDetails);
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'voyageDocuments'
              };
              resolve(fileInfo);
          });
      });
  }
});

const upload = multer({ storage });
app.use('/voyageDocuments', voyageDocuments(upload));
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
        //res.send([{ 'key': 'value' }]);
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('listening at 3003');
})
