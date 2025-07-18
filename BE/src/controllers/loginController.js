const loginService = require('../services/loginService');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Tài khoản: '"+username+"' đã đăng nhập");
    const result = await loginService.login(username, password);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
