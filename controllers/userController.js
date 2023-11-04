const courseModel = require("../model/courseModel");


// const courseModels = [
//     {
//         id: '1',
//         name: 'yousuf'
//     },
//     {
//         id: '2',
//         name: 'munir'
//     },
//     {
//         id: '3',
//         name: 'zaid'
//     },
//     {
//         id: '4',
//         name: 'abc'
//     },
//     {
//         id: '5',
//         name: 'xyz'
//     },
//     {
//         id: '6',
//         name: 'pqr'
//     }

// ]


const userController = {
    get: async (req, res) => {
        try{ 
        let result = await courseModel.find();; 
        res.send({
            isSuccessfull: true,
            data:result,
            message:'Data Found'
        });

    } catch (e){
        res.send({
            isSuccessfull: false,
            data: null,
            messsage: 'No Data Found',
        });
    }
    },

    getById: async (req, res) => {
    const id = req.params.id;
    let result = await courseModel.findById(id);

    if (result) {
        res.send({
            isSuccessfull: true,
            data: result,
            messsage: 'Data Found',
        });
    } else {
        res.send({
            isSuccessfull: false,
            data: null,
            messsage: 'No Data Found',
        });
    }
},
    post: async(req, res) => {
        let { name } = req.body;
        let obj2 = { name };
        let errArray = [];
        try{
        if (!obj2.name) {
            errArray.push("Required name");
        }
    
        if (errArray.length > 0) {
            res.send({
                isSuccessfull: false,
                message: "Validation Error !",
                data: errArray,
            })
        } else {
            let newcourseModel = new courseModel(obj2);
            let result = await newcourseModel.save()
    
    
            res.send({
                isSuccessfull: true,
                message: "Data Added successfully",
                data: result,
            })
        }}
        catch(err){
            res.send({
                isSuccessfull: false,
                message: "Error",
            })
        }
    
    },
    del: (req, res) => {
        const id = req.params.id;
        let result = courseModel.findByIdAndDelete(id)
    
        if (result !== -1) {
            const deletedcourseModel = courseModel.splice(result, 1);
            console.log(deletedcourseModel)
            res.send({
                isSuccessfull: true,
                data: deletedcourseModel,
                messsage: 'Delete Sucessfully',
            });
        } else {
            res.send({
                isSuccessfull: false,
                data: null,
                messsage: 'No Data Found',
            });
        }
    },
    put: (req, res) => {
        const id = req.params.id;
        const updatedcourseModel = req.body; // Assuming the request body contains the updated courseModel data
    
        // Find the index of the courseModel with the specified ID
        const index = courseModel.findByIdAndUpdate(id);
    
        if (index !== -1) {
            // Update the courseModel data
            courseModel[index] = { ...courseModel[index], ...updatedcourseModel };
    
            res.send({
                isSuccessfull: true,
                message: 'courseModel updated successfully',
                data: courseModel[index],
            });
        } else {
            res.send({
                isSuccessfull: false,
                data: null,
                message: 'courseModel not found',
            });
        }
    },
}

module.exports = userController;

