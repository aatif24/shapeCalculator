export const somHelperFunction = () => {
    return "test";
};

export const validateShapeSelection = (data) => {
    let errorObject = {};
    let status = 1;
    if (!data.shape) {
        errorObject.shape = "please select a shape";
        status = 0;
    }
    return { status, errorObject };
};
export const validateShapeInput = (data) => {
    let errorObject = {};
    let status = 1;
    for (const key in data) {
        if (!data[key]) {
            errorObject[key] = `${key} is required`;
            status = 0;
        }
    }
    return { status, errorObject };
};
