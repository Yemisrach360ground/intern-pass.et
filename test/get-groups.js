let chai = require('chai');
let chaiHttp = require('chai-http');
let Group = require('../app/models/Group');
chai.use(chaiHttp);
let should = chai.should();