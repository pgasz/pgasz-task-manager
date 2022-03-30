const Task = require('../models/Task');

const updateTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        }).exec();
        task
            ? res.status(200).json({ task })
            : res.status(404).json({ msg: `No task witch id: ${taskID}` });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = updateTask;
