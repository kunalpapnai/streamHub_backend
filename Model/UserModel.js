const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
    poster_path: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true }
});

/*****************user model*********************/
// user create -> Jio cinema -> set of rules
const schemaRules = {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address"
        ],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password should be atleast of 6 length"],
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 6,
        //custom validation
        validate: [function(){
            return this.password == this.confirmPassword;
        }, "password should be equal to confirm password"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        // these are the only possible values for the role
        enum: ["user", "admin", "feed curator", "moderator"],
        default: "user"
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    wishlist: [wishlistItemSchema],
}

// model -> entity

// collection
    // -> no guards

// model is special collection where every document should follow a schema

const userSchema = new mongoose.Schema(schemaRules);

/************hooks in mongodb******************/
userSchema.pre("save", function(next){
    console.log("pre save was called");
    this.confirmPassword = undefined;
    next();
})

userSchema.post("save", function(){
    console.log("post save was called");
    this.__v = undefined;
    this.password = undefined;
})

// final touchpoint
const userModel = mongoose.model("User", userSchema);

// default export
module.exports = userModel;