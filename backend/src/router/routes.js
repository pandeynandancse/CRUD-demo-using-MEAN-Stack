const express = require('express')
const router = express.Router()


const peopleController =   require('../controller/controller');





// Retrieve all people
/**
 * @swagger
 * /api/v1/peoples/:
 *  get:
 *   description: Get all peoples as a List
 *   responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *       201:
 *         description: Internal Error while retrieving List of all peoples.
 */
router.get('/', peopleController.findAll);





/**
 * @swagger
 * /api/v1/peoples:
 *   post:
 *     summary: Create a new people with given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Nandan
 *               last_name:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Pandey
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: pandeynandancse@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile no..
 *                 example: 7752984410
 *     responses:
 *       204:
 *         description: Internal error while checking if Email already exists.
 *       205:
 *         description: Email aaready exists.
 *       206:
 *         description: Error during creation of New People!.
 *       207:
 *         description: People added successfully!
*/

// Create a new people
router.post('/', peopleController.create);








// Retrieve a single people with id
/**
 * @swagger
 * /api/v1/peoples/{id}:
 *  get:
 *   description: Get single People whose id is provided
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the people to retrieve.
 *         schema:
 *           type: integer
 *   responses:
 *       202:
 *         description: Internal Error while retrieving single peple details.
 *       203:
 *         description: Detail of Single People Retrieved Successfully.
 */
router.get('/:id', peopleController.findById);





// Update a people with id

/**
 * @swagger
 * /api/v1/peoples/{id}:
 *   put:
 *     summary: Update single people whose ID is provided as URL parameter with provided body .
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the people to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Nandan
 *               last_name:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Pandey
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: pandeynandancse@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile no..
 *                 example: 7752984410
 *     responses:
 *       208:
 *         description: Error occured during update of people.
 *       209:
 *         description: People successfully updated.
 *       212:
 *         description: Internal Error during check if email already exists.
 *       213:
 *         description: Email already exists.
*/
router.put('/:id', peopleController.update);






// Delete a people with id
/**
 * @swagger
 * /api/v1/peoples/{id}:
 *  delete:
 *   description: Delete single people with specified ID
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the people to retrieve.
 *         schema:
 *           type: integer
 *   responses:
 *       210:
 *         description: Error occured during deletion.
 *       211:
 *         description: People successfully deleted.
 */
router.delete('/:id', peopleController.delete);



module.exports = router