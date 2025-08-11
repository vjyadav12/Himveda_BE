import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "Rice Water for Hair and Skin"
  },  
  subtitle: {
    type: String,
    required: true, // e.g., "The power of grain for your hair health gain."
  },

  //  Main image
  thumbnail: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  images: [
    {
      image: {
        public_id: String,
        secure_url: String,
      },
    },
  ],
  originalRate: {
    type: Number,
    required: true, // e.g., 499
  },
  discountRate: {
    type: Number,
    required: true, // e.g., 399
  },
  offerDiscount: {
    type: Number,
    required: true, // e.g., 20
  },
  savingsAmount: {
    type: Number,
    required: true, // e.g., 100
  },
  currency: {
    type: String,
    default: "INR",
  },
  buttonText: {
    type: String,
    default: "Add To Cart",
  },
  numberOfLecture: {
      type: Number,
      default:0,
    }
},{
    timestamps:true
});

export default mongoose.model("Product", productSchema);
