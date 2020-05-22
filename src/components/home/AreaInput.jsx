/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../css/style.css";

import { connect } from "react-redux";
import Loader from "../Loader";
import { validateShapeInput } from "../../helpers";
/**
 * redux
 */

import { loading, selectedShape, setStep, shapeData, formData } from "../../redux/actions/index";

const mapStateToProps = (state) => {
    return {
        loading: state.index.loading,
        selectedShape: state.index.selectedShape,
        shapeData: state.index.shapeData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (payload) => dispatch(loading(payload)),
        setSelectedShape: (payload) => dispatch(selectedShape(payload)),
        getShapeData: (payload) => dispatch(shapeData(payload)),
        setStep: (payload) => dispatch(setStep(payload)),
        setFormData: (payload) => dispatch(formData(payload)),
    };
};
const App = ({
    getShapeData,
    selectedShape,
    setSelectedShape,
    shapeData,
    loading,
    setStep,
    setFormData,
}) => {
    const [formError, setFormError] = useState({});

    useEffect(() => {
        getShapeData(selectedShape);
    }, []);

    let submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = {};
        for (var p of formData) {
            let [name, value] = p;
            data[name] = value;
        }

        let { status, errorObject } = validateShapeInput(data);
        if (!status) {
            setFormError(errorObject);
            return;
        }
        setFormData(data);
        setStep("shapeArea");
        return;
    };
    let RenderInputs = () => {
        let returnStatement = [];
        returnStatement.push(
            <p className="font-weight-light" key={0}>
                You have selected a {shapeData && shapeData.name}, please input the required
                variables
            </p>
        );
        if (shapeData && shapeData.inputs && shapeData.inputs.length) {
            for (let i = 0; i < shapeData.inputs.length; i++) {
                let e = shapeData.inputs[i];
                returnStatement.push(
                    <div className="form-group mb-3" key={i + 1}>
                        <label className="control-label text-capitalize font-weight-bold h5 my-0 py-0">
                            {e.name}:
                        </label>
                        <input
                            type={e.type}
                            name={e.name}
                            className="form-control form-control-lg border-dark"
                            aria-label={e.name}
                        />
                        <small className="text-danger">{formError[e.name]}</small>
                    </div>
                );
            }
        }

        return returnStatement;
    };
    return (
        <div className="bg-yellow h-100 rounded ">
            <div className="p-5 h-100">
                <p className="h5 font-weight-bold mb-4">Step 2 - Insert Your Values</p>
                {loading ? <Loader /> : null}

                <form
                    id="area-input-form"
                    name="shapeAreaInput"
                    className=""
                    onSubmit={(e) => {
                        submitForm(e);
                    }}
                >
                    <RenderInputs />
                    {shapeData && Object.keys(shapeData).length ? (
                        <div className="mt-5 d-flex justify-content-between">
                            <button className="btn flex-fill btn-green font-weight-bold w-50 mr-2">
                                Next
                            </button>
                            <button
                                type="button"
                                className="btn flex-fill  bg-white font-weight-bold w-50 ml-2"
                                onClick={(e) => {
                                    setSelectedShape(false);
                                    setStep("selectShape");
                                    document.getElementById("area-input-form").reset();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
