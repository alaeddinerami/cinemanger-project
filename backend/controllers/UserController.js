const User = require("../models/User"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authSchema, createAdminValidation } = require("../helpers/validation_schema");
class UserController {
  async getAllAdmin(req, res){
    try {
      const admins = await User.find({role:'admin'});
      res.status(200).json(admins)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
  async getAdminById(req,res){
    try {
      const adminId = req.params.id
      // if(!adminId){
      //   res.status(400).json({message:"invalide admin id"})
      // }
      const admin = await User.findOne({_id: adminId, role:'admin'})
      if(!admin){
        return res.status(404).json({message:"admin not found"})
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
    
  }
    async create(req,res){
        try {
          const {name, email, password, role} = req.body;
          const reqValidation = await createAdminValidation.validateAsync(req.body);
          console.log(reqValidation);
          
          const existingAdmin = await User.findOne({email})
          if(existingAdmin){
            return res.status(400).json({message:"admin already exists"});
          }
          const hashedPassword = await bcrypt.hash(password,8)
          const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin'
          }) 
          await admin.save();
          res.status(200).json({message:"admin created successfully"})
        } catch (error) {
          if (error.isJoi === true) {
            return res.status(422).json({ message: "Validation error", error: error.details[0].message });
        }
          res.status(500).json({message: error.message});
        }
  }
  async update(req, res) {
    try {
        const adminId = req.params.id;
        const { name, email, password } = req.body;

        let admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const updatedData = {
            name: name || admin.name,
            email: email || admin.email
        };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 8);
        }

        admin = await User.findByIdAndUpdate(adminId, updatedData, { new: true });

        res.status(200).json({ message: "Admin updated successfully", admin });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async delete(req, res) {
  try {
    const adminId = req.params.id; 

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await User.findByIdAndDelete(adminId);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const result = await authSchema.validateAsync(req.body);
      console.log(result);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = new User({
        name,
        email,
        password: hashedPassword,

      });
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, 
        {
          expiresIn: "90d",
        }
      );

      await user.save();
      res.status(201).json({token, user, message: "User registered successfully" });
    } catch (error) {
      if (error.isJoi) {
        return res
          .status(422)
          .json({ message: "Validation error", details: error.details });
      }
      res.status(500).json({ message: "Server error", error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      console.log(password);
     
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // console.log(req.body.password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "email or password invalid" });
      }else{

        
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "90d",
          }
        );
        
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          message: "User loged successfully", 
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = new UserController();
