/* eslint-disable eqeqeq */

import json from "../../data/shapes.json";
const jsonObj = JSON.parse(JSON.stringify(json));
export function loading(payload) {
    return { type: "LOADING", payload };
}

export function shapes(payload) {
    return async (dispatch) => {
        function onSuccess(data) {
            dispatch(getList(data));
            dispatch(loading(false));
        }
        try {
            dispatch(loading(true));

            onSuccess(jsonObj);
        } catch (error) {
            return error;
        }
    };
}
export function shapeData(payload) {
    return async (dispatch) => {
        function onSuccess(data) {
            dispatch(setShapeInput(data));
            dispatch(loading(false));
        }
        try {
            dispatch(loading(true));
            for (let i = 0; i < jsonObj.length; i++) {
                let shape = jsonObj[i];

                if (shape.id == payload) {
                    onSuccess(shape);
                    return;
                }
            }
            onSuccess({});
        } catch (error) {
            return error;
        }
    };
}
export function formData(payload) {
    return async (dispatch) => {
        function onSuccess(data) {
            dispatch(setFormData(data));
            dispatch(loading(false));
        }
        try {
            dispatch(loading(true));

            onSuccess(payload);
        } catch (error) {
            return error;
        }
    };
}

export function getList(payload) {
    return { type: "SHAPES_LIST", payload };
}
export function selectedShape(payload) {
    return { type: "SELECTED_SHAPE", payload };
}
export function setStep(payload) {
    return { type: "STEP", payload };
}
export function setShapeInput(payload) {
    return { type: "SHAPE_INPUT", payload };
}
export function setFormData(payload) {
    return { type: "SHAPE_FORM_DATA", payload };
}
