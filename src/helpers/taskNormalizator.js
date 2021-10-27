import taskAllowedToPatchFields from "../configs/enum/taskAllowedToPatchFields";

const taskNormalizator = (taskToNormalize) => {
    const taskEntries = Object.entries(taskToNormalize);
    const allowedFields = Object.values(taskAllowedToPatchFields);

    const result = {};

    taskEntries.forEach((item) => {
        const [fieldName, value] = item;
        if(allowedFields.includes(fieldName) && item){
            result[fieldName] = value;
        }
    })

    return result;
};

export default taskNormalizator;
