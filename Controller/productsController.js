import addProducts from "../DBSchema/addProducts_Schema.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const Products = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "welcome to Adding Product page sir",
  });
};

const AddingMainProduct = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      originalRate,
      discountRate,
      offerDiscount,
      savingsAmount,
      buttonText,
    } = req.body;

    if (
      !title ||
      !subtitle ||
      !originalRate ||
      !discountRate ||
      !offerDiscount ||
      !savingsAmount ||
      !buttonText
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to add new product.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    console.log("📂 Incoming file:", req.file);

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms",
      transformation: {
        crop: "auto",
        width: 250,
        height: 250,
        gravity: "auto",
      },
    });

    // Remove local file after upload
    await fs.rm(req.file.path);

    // Create product in DB
    const product = await addProducts.create({
      title,
      subtitle,
      thumbnail: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
      originalRate,
      discountRate,
      offerDiscount,
      savingsAmount,
      buttonText,
    });

    res.status(200).json({
      success: true,
      message: "Product added successfully!",
      product,
    });
  } catch (e) {
    console.error("❌ Error:", e.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${e.message}`,
    });
  }
};

const adding_images = async (req, res, next) => {
  try {
   
    const { id } = req.params;

    console.log("here is your id sir:",id)

    // Log incoming file
    console.log("🧾 Incoming file data:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:"No image file found in the request.",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms/images",
      resource_type: "image",
    });

    // Construct images data
    const imagess = {
      image: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      }
    };

    // Push images into the Products
    const updateResult = await addProducts.updateOne(
      { _id: id },
      {
        $push: { images: imagess }, 
        $inc: { numberOfLecture: 1 },
      }
    );

    // Delete local video file after upload
    fs.rm(req.file.path);

    // Check update status
    // if (updateResult.modifiedCount === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Images not upload, please try again letter.",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Images added successfully!",
      // lecture: lectureData,
    });
  } catch (e) {
    console.error("❌ Error uploading lecture:", e.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${e.message}`,
    });
  }
};


export { Products, AddingMainProduct,adding_images };
