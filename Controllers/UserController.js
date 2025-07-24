const userModel = require("../Model/UserModel");

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, name, email, createdAt, wishlist, isPremium } = await userModel.findById(userId);
        res.status(200).json({
            user: {
                _id: _id,
                name: name,
                email: email,
                createdAt: createdAt,
                wishlist: wishlist,
                isPremium: isPremium,
            },
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const getUserWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        res.status(200).json({
            data: user.wishlist,
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { id, poster_path, media_type, name } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.wishlist.find(item => item.id === id)) {
            return res.status(400).json({
                message: "Item already in watchlist",
                status: "failure",
            });
        }

        const wishlistItem = {
            poster_path: poster_path,
            name: name,
            id: id,
            media_type: media_type
        };

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { $push: { wishlist: wishlistItem } },
            { new: true, upsert: true } // options to return the updated document and create if it doesn't exist
        );

        res.status(200).json({
            user: updatedUser,
            status: "success",
            message: "Item added to wishlist successfully",
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: error.message,
            status: "failure",
        });
    }
};

const deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body; // Only need the item ID for deletion

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failure",
      });
    }

    // Check if item exists in wishlist before attempting to remove
    if (!user.wishlist.some((item) => item.id === id)) {
      return res.status(404).json({
        message: "Item not found in wishlist",
        status: "failure",
      });
    }

    // Remove the item from wishlist using $pull operator
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { wishlist: { id: id } } },
      { new: true }
    );

    // Send success response
    res.status(200).json({
      user: updatedUser,
      status: "success",
      message: "Item removed from wishlist successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

module.exports = { getCurrentUser, getUserWishlist, addToWishlist, deleteFromWishlist };