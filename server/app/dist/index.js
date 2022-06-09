"use strict";

require("./database/connection");

var _routes = _interopRequireDefault(require("./routes"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const application = (0, _express.default)();
application.use((0, _cors.default)());
application.use(_express.default.json());
application.use(_routes.default);
application.listen(process.env.PORT || 3001, () => {
  console.log('📦 Server running');
});