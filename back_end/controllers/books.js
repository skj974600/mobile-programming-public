const fs = require("fs");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const { nextTick } = require("process");

const getRecommendedBooks = asyncWrapper(async (req, res) => {
    const {username: userName} = req.params;

    const spawn = require('child_process').spawn;

    const result = await spawn('python3', [process.cwd() + '/resources/recommendBooks.py', userName]);
    console.log("searching")
    result.on('exit', () => {
        const file = process.cwd() + "/resources/recommendBooks.json";
        try{
            const data = fs.readFileSync(file, 'utf8');
            const jsonData = JSON.parse(data)
            res.status(200).json({ jsonData });
        }catch (err){
            return nextTick(createCustomError(`${err}`))
        }
    });

});

module.exports = {
    getRecommendedBooks,
};
