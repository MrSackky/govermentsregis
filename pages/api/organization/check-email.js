import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays } from '../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    return res.status(400).json({
      status: 400,
      message: 'deny permission!!',
    });
  })
  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const { email } = body;
    // const userId = slug;


    if (!email) {
      return res.status(200).json({
        status: 201,
        message: '- ไม่พบข้อมูล',
        email: email
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataOrganization = await models.Organization.findOne({ 
      where: { organization_email: email } ,
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataOrganization != null) {
      return res.status(200).json({
        status: 202,
        message: 'มี email `'+ email +'` ในระบบแล้ว',
      });
    }

    const dataUsers = await models.Users.findOne({ 
      attributes: ['user_id', 'user_name'],
      where: { user_name: email } 
    });
    if (dataUsers != null) {
      return res.status(200).json({
        status: 203,
        message: 'มี email `'+ email +'` ในระบบแล้ว',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'สามารถใช้ email `'+ email +'` ได้',
    });
    // .then(([_user, created]) => {
    //   // console.log(_user.get({
    //   //   plain: true
    //   // }))
    //   console.log("created")
    //   console.log(created)
    //   console.log("_user")
    //   console.log(_user.dataValues)

    //   if (!created) {
    //     return res.status(200).json({
    //       status: 202,
    //       message: 'data user is exist.',
    //     });
    //   }

    //   return res.status(200).json({
    //     status: 'success',
    //     message: 'done',
    //     // dataRequest: dataUser,
    //     dataResult: _user.dataValues,
    //   });
    //   //user data
    //   const dataUser2 = {
    //     user_name: organization_email,
    //     password,
    //     name_user,
    //     organization_id: _user.dataValues.organization_id,
    //     email_user: organization_email,
    //     phone_user: organization_phone,
    //   };

    // await models.Users.findOrCreate({ where: { user_name: organization_email }, defaults: dataUser2 })
    //   .then(([_user2, created2]) => {

    //     console.log("created2")
    //     console.log(created2)
    //     console.log("_user2")
    //     console.log(_user2)

    //     if (!created2) {
    //       return res.status(200).json({
    //         status: 202,
    //         message: 'data user "email" is exist.',
    //       });
    //     }
    //     return res.status(200).json({
    //       status: 'success',
    //       message: 'done',
    //       // dataRequest: dataUser,
    //       // dataResult: _user.Organization.dataValues,
    //     });
    //   })

    // })



  });

export default handler;
