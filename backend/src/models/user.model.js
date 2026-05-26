import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


const UserSchema = new Schema(
    {
        username: {
            type: String,
            default:'Aloo ke parathe',
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },

        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

User.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

   try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
   } catch (error) {
        next(error);
   }
})

UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken() = function () {
    return jwt.sign(
        {  
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_GENERATOR,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}


UserSchema.methods.generateRefreshToken() = function () {
    return jwt.sign(
        {  
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_GENERATOR,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", UserSchema);