const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://arw:admin@admin.5isqd5e.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

app.use(express.json());
app.use(cors());

const port = 7777;

const CarouselModel = new mongoose.Schema({
  urls: {
    type: [String]
  }
});

const reviewSchema = new mongoose.Schema({
  rate: Number,
  name: String,
  description: String,
  token: String,
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);




const LandingSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  button: {
    type: String,
    required: true
  }
});

const LicenseSchema = new mongoose.Schema({
  licenseText: {
    type: String,
    required: true,
  },
});

const License = mongoose.model('License', LicenseSchema);


const ProductSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  price: Number,
  colors: String,
  sizes: String,
  images: [String],
});



const vidtextSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const vidtextcSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
const CodSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  }
})


const Carousel = mongoose.model('carousel', CarouselModel);
const Landing = mongoose.model('landing', LandingSchema);
const Product = mongoose.model('Product', ProductSchema);
const vidtext = mongoose.model('vidtext', vidtextSchema);
const vidtextc = mongoose.model('vidtextc', vidtextcSchema);
const Cod = mongoose.model('cod', CodSchema);


app.post('/admin/landing-video', async (req, res) => {
  const constant_id = '6541eb58b7e1d60766f5ed54';

  try {
    const { videoUrl } = req.body;

    const updatedLandingData = await Landing.findByIdAndUpdate(
      constant_id,
      { $set: { videoUrl } }, // Use $set to update only the specified field
      { new: true }
    );

    res.json(updatedLandingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating videoUrl.' });
  }
});

app.post('/admin/cod', async (req, res) => {
  try {
    const { price } = req.body;
    const constant_id = '6566b6f4370e09b7089be690'


    const updateCod = await Cod.findByIdAndUpdate(
      constant_id,
      {
        price
      },
      { new: true }
    );
    res.json({ message: 'Price updated and saved successfully', updateCod });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating price.' });
  }
})
app.get('/admin/cod-details', async (req, res) => {


  try {
    const cod = await Cod.find({});
    res.json(cod);
  } catch (error) {
    console.error('Error retrieving cod details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving cod details' });
  }
})

app.post('/admin/landing-details', async (req, res) => {
  const constant_id = '6541eb58b7e1d60766f5ed54';

  try {
    const { heading, text, button } = req.body;

    const updatedLandingData = await Landing.findByIdAndUpdate(
      constant_id,
      { $set: { heading, text, button } },
      { new: true }
    );

    res.json(updatedLandingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating details.' });
  }
});




app.post('/admin/landing', async (req, res) => {
  const constant_id = '6541eb58b7e1d60766f5ed54';
  try {
    const { videoUrl, heading, text, button } = req.body;
    const updatedLandingData = await Landing.findByIdAndUpdate(
      constant_id,
      {
        videoUrl,
        heading,
        text,
        button,
      },
      { new: true }
    );
    res.json(updatedLandingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating data.' });
  }
});



app.get('/admin/landing-details', async (req, res) => {
  try {
    const landing = await Landing.find({});
    res.json(landing);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product details' });
  }
});



app.post('/admin/product', async (req, res) => {
  try {
    const constant_id = '653fc116c36248091f0d4712';

    const {
      productName,
      productDescription,
      price,
      colors,
      sizes,
      images
    } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: constant_id },
      {
        productName,
        productDescription,
        price,
        colors,
        sizes,
        images
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Product update failed' });
  }
});




app.get('/admin/license-details', async (req, res) => {
  try {
    const lic = await License.find({});
    res.json(lic);
  } catch (error) {
    console.error('Error retrieving license details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving license details' });
  }
}
)
app.post('/admin/license', async (req, res) => {
  const constant_id = '65603e2ab5c1d742439d1b99';

  try {
    const { licenseText } = req.body;
    const updatedLicense = await License.findOneAndUpdate(
      { _id: constant_id },
      { licenseText: licenseText },
      { new: true }
    );
    if (updatedLicense) {
      res.json(updatedLicense);
    } else {
      res.status(404).json({ error: 'License not found' });
    }
  } catch (error) {
    console.error('Error updating license:', error);
    res.status(500).json({ error: 'Failed to save license text' });
  }
});


app.post('/admin/vidtext', async (req, res) => {
  const constant_id = '654267e12cd1776a76630e24';
  try {
    const { videoUrl, text } = req.body;

    const updatedProduct = await vidtext.findOneAndUpdate(
      { _id: constant_id },
      {
        videoUrl,
        text
      },
      { new: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Product update failed' });
  }

});

app.get('/admin/vidtext-details', async (req, res) => {
  try {
    const vidatext = await vidtext.find({});
    res.json(vidatext);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product details' });
  }
});

app.post('/admin/vidtextc', async (req, res) => {
  const constant_id = '654281c973e8db2dd0669d59';
  try {
    const { videoUrl, text } = req.body;

    const updatedProduct = await vidtextc.findOneAndUpdate(
      { _id: constant_id },
      {
        videoUrl,
        text
      },
      { new: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Product update failed' });
  }
});

app.get('/admin/vidtextc-details', async (req, res) => {
  try {
    const vidatext = await vidtextc.find({});
    res.json(vidatext);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product details' });
  }
});

app.post('/admin/carousel', (req, res) => {
  const constantId = '65421abf48b28d68631d4a2b';
  const { urls } = req.body;
  if (Array.isArray(urls)) {
    Carousel.findByIdAndUpdate(constantId, { urls }, { new: true })
      .then((updatedCarousel) => {
        if (!updatedCarousel) {
          return res.status(404).json({ error: 'Carousel not found' });
        }
        res.status(200).json(updatedCarousel);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Error updating image URLs' });
      });
  } else {
    res.status(400).json({ error: 'Invalid request data. URLs must be in an array.' });
  }
});

app.get('/admin/carousel-details', async (req, res) => {
  try {
    const carousel = await Carousel.find({});
    res.json(carousel);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product details' });
  }
});

app.get('/admin/product-details', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error retrieving product details:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product details' });
  }
});

app.post('/admin/update-ratings', async (req, res) => {
  try {
    const updatedRatings = req.body;


    const updatedRatingsObjects = updatedRatings.map(rating => new Review(rating));
    await Review.insertMany(updatedRatingsObjects);

    res.status(201).json({ message: 'Ratings updated successfully' });
  } catch (error) {
    console.error('Error updating ratings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/admin/latest-updated-reviews', async (req, res) => {
  try {
    const latestUpdatedReviews = await Review.find()
      .sort({ updatedAt: -1 })
      .exec();

    res.status(200).json(latestUpdatedReviews);
  } catch (error) {
    console.error('Error fetching latest updated reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
