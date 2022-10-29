const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // Get all projects and JOIN with user data
    const productData = await Category.findAll({
      include: [
       Product
      ],
    });

    res.status(200).json(productData)
   
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const productData = await Category.findByPk(req.params.id, {
      include: [
       Product
      ],
    });

    

    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err);
  }



});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(response =>res.json(response))
  .then(err =>(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
Category.update(req.body,{
  where:{id:req.params.id}
})
.then(response =>res.json(response))
.then(err =>(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{id:req.params.id}

  })
  .then(response =>res.json(response))
  .then(err =>(err))
});



module.exports = router;
