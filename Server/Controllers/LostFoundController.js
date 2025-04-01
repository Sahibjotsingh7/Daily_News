const LostFound = require("../Models/LostFound");
const { cloudinary } = require("../config");

const uploadFoundItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded or invalid file type." });
    }

    const { productName, description, whereFound, whenFound, uploaderName, mobile } = req.body;
    if (!productName || !whereFound || !whenFound || !uploaderName || !mobile) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Upload to Cloudinary using upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Automatically detect file type (image or video)
        folder: "lost-and-found",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", error });
        }

        // Save to MongoDB
        const newItem = new LostFound({
          productName,
          description,
          whereFound,
          whenFound: new Date(whenFound), // Convert to Date object
          uploaderName,
          mobile,
          mediaUrl: result.secure_url, // Store Cloudinary URL
          publicId: result.public_id, // Store Cloudinary public ID for future deletion if needed
        });

        await newItem.save();
        res.status(201).json({ message: "Item uploaded successfully", item: newItem });
      }
    );

    // Pipe the file buffer to Cloudinary
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLostItems = async (req, res) => {
  try {
    const items = await LostFound.find().sort({ time: -1 }); // Sort by latest upload first
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lost items", error: error.message });
  }
};

module.exports = { uploadFoundItem, getLostItems };