const jwt = require('jsonwebtoken')
module.exports = {
  // checkTokenAdmin: (req, res, next) => {
  //   try {
  //     let token = req.get('authorization')
  //     if (token) {
  //       // Remove Bearer from string
  //       token = token.slice(7)
  //       jwt.verify(token, process.env.JWT_KEY_ADMIN, (err, decoded) => {
  //         // console.log('TOK',token);
  //         if (err) {
  //           return res.json({
  //             success: 0,
  //             message: 'Invalid Token...',
  //           })
  //         } else {
  //           // console.log('DEC',decoded);
  //           req.decoded = decoded
  //           next()
  //         }
  //       })
  //     } else {
  //       return res.json({
  //         success: 0,
  //         message: 'Access Denied! Unauthorized User',
  //       })
  //     }
  //   } catch (error) {
  //     return res.json({
  //       success: 0,
  //       message: 'Invalid Token...',
  //     })
  //   }
  // },
  checkToken: (req, res, next) => {
    try {
      let token = req.get('authorization')
      if (token) {
        // Remove Bearer from string
        token = token.slice(7)
        jwt.verify(token, process.env.JWT_KEY_USER, (err, decoded) => {
          console.log('TOK', token)
          if (err) {
            return res.json({
              success: 0,
              message: 'Invalid Token...',
            })
          } else {
            // console.log('req', req)
            let url = req.baseUrl.replace('/api/', '')
            let method = req.method
            let index1 = 0,
              index2 = 0
            switch (method) {
              case 'GET':
                index2 = 0
                break
              case 'POST':
                index2 = 1
                break
              case 'PATCH':
                index2 = 2
                break
              case 'DELETE':
                index2 = 3
                break

              default:
                break
            }
            switch (url) {
              case 'category':
                index1 = 0
                break
              case 'inventory':
                index1 = 1
                break
              case 'items':
                index1 = 2
                break
              case 'orderdetails':
                index1 = 3
                break
              case 'orders':
                index1 = 4
                break
              case 'users':
                index1 = 5
                break
              case 'roles':
                index1 = 6
                break

              default:
                break
            }

            decoded.result.permissions = JSON.parse(decoded.result.permissions)
            let permissionGranted = decoded.result.permissions[index1][index2]
            if (permissionGranted) {
              req.decoded = decoded
              next()
            } else {
              return res.json({
                success: 0,
                message: 'Access Denied! No Permission!',
              })
            }
            // req.decoded = decoded
            // next()
          }
        })
      } else {
        return res.json({
          success: 0,
          message: 'Access Denied! Unauthorized User',
        })
      }
    } catch (error) {
      console.log(error)
      return res.json({
        success: 0,
        message: 'Invalid Token...',
      })
    }
  },
  // checkTokenUser: (req, res, next) => {
  //   let token = req.get('authorization')
  //   if (token) {
  //     // Remove Bearer from string
  //     token = token.slice(7)
  //     jwt.verify(token, process.env.JWT_KEY_USER, (err, decoded) => {
  //       if (err) {
  //         return res.json({
  //           success: 0,
  //           data: '',
  //           message: 'Invalid Token...',
  //         })
  //       } else {
  //         req.decoded = decoded
  //         // next();
  //         console.log(decoded)
  //         return res.json({
  //           success: 1,
  //           data: decoded.result,
  //           message: 'Access Granted! Authorized User',
  //         })
  //       }
  //     })
  //   } else {
  //     return res.json({
  //       success: 0,
  //       data: '',
  //       message: 'Access Denied! Unauthorized User',
  //     })
  //   }
  // },
}
