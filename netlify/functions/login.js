// "use strict"

// const headers = require('./headersCORS');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// exports.handler = async (event, context) => {

//   if (event.httpMethod == "OPTIONS") {
//     return {statusCode: 200,headers,body: "OK"};
//   }

//   try {

//     const data = JSON.parse(event.body);

//     if (!(data.email && data.password)) {
//       return { statusCode: 400, headers, body:"All input is required"};
//     }

//     let user = {'_id':1,'token':''};
//     let passwd = await bcrypt.hash('12345', 10);

//     if (await bcrypt.compare(data.password, passwd)) {
//       user.token = jwt.sign(
//          { user_id: user._id, email:data.email },
//          process.env.TOKEN_KEY,
//          {
//            expiresIn: "2h",
//          }
//        );
//       return { statusCode: 200, headers, body: JSON.stringify(user)};
//     }
// 		return { statusCode: 400, headers, body: 'Invalid Credentials' };
//   } catch (error) {
//     console.log(error);
//     return { statusCode: 422, headers, body: JSON.stringify(error) };
//   }
// };



"use strict"

const headers = require('./headersCORS');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const data = JSON.parse(event.body);

    if (!(data.email && data.password)) {
      return { statusCode: 400, headers, body: "All input is required" };
    }

    // Configura la conexión a MongoDB
    const uri = "mongodb+srv://admin:admin@cluster0.6l3gxpe.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    try {
      await client.connect();
      const user = await client.db("tarea").collection("usuarios").findOne({ email: data.email });

      if (user && (await bcrypt.compare(data.password, user.password))) {
        user.token = jwt.sign(
          { user_id: user._id, email: data.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        return { statusCode: 200, headers, body: JSON.stringify(user)};
      } else {
        // return { statusCode: 400, headers, body: 'Invalid Credentials', body2: JSON.stringify(user) };
        
        return { statusCode: 400, headers, body: JSON.stringify(user) };
      }
    } finally {
      // Cierra la conexión con MongoDB
      await client.close();
    }
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
