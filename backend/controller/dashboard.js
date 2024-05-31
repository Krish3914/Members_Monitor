exports.dashboard = async (req, res) => {
    try {
      const user = req.user;
      // const token = req.headers['authorization'].replace(/^Bearer\s/, '');
      // console.log("login is sucess");
      user.password = undefined;  
      
      return res.status(200).json({
        user: user,
        success: true,
        message: "login sucessfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "unable to Login",
      });
    }
  }