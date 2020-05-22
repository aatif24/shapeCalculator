const initialState = {
    shapes: [],
    loading: false,
    selectedShape: false,
    step: "selectShape",
    shapeData: {},
    formData: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHAPES_LIST":
            state = { ...state, shapes: action.payload };
            return state;
        case "SELECTED_SHAPE":
            state = { ...state, selectedShape: action.payload };
            return state;
        case "STEP":
            state = { ...state, step: action.payload };
            return state;
        case "SHAPE_INPUT":
            state = { ...state, shapeData: action.payload };
            return state;
        case "SHAPE_FORM_DATA":
            return { ...state, formData: action.payload };
        case "LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default reducer;
