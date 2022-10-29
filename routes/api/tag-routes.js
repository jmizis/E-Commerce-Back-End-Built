const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // Get all projects and JOIN with user data
    const productData = await Tag.findAll({
      include: [
        {
          model: Product,
          through:ProductTag
          
        },
      ],
    });

    res.status(200).json(productData)
   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through:ProductTag
          
        },
      ],
    });

    

    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(response =>res.json(response))
  .then(err =>(err))
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 Tag.update(req.body,{
    where:{id:req.params.id}
  })
  .then(response =>res.json(response))
  .then(err =>(err))
  });


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
 Tag.destroy({
    where:{id:req.params.id}

  })
  .then(response =>res.json(response))
  .then(err =>(err))
});



module.exports = router;
