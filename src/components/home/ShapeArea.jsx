/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../../css/style.css";

import { connect } from "react-redux";
import Loader from "../Loader";

/**
 * redux
 */

import { loading, selectedShape, setStep, shapeData } from "../../redux/actions/index";

const mapStateToProps = (state) => {
    return {
        loading: state.index.loading,
        selectedShape: state.index.selectedShape,
        shapeData: state.index.shapeData,
        formData: state.index.formData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (payload) => dispatch(loading(payload)),
        setSelectedShape: (payload) => dispatch(selectedShape(payload)),
        getShapeInput: (payload) => dispatch(shapeData(payload)),
        setStep: (payload) => dispatch(setStep(payload)),
    };
};
const App = ({
    getShapeInput,
    selectedShape,
    setSelectedShape,
    shapeData,
    loading,
    setStep,
    formData,
}) => {
    useEffect(() => {
        getShapeInput(selectedShape);
    }, []);

    let Area = () => {
        let sd = shapeData;
        for (const key in formData) {
            var myRegExp = new RegExp("{" + key + "}", "g");
            sd.formula = sd.formula.replace(myRegExp, formData[key]);
        }
        return eval(sd.formula).toFixed(2);
    };

    return (
        <div className="bg-yellow h-100 rounded ">
            <div className="p-5 h-100">
                <p className="h5 font-weight-bold mb-4">Step 3 - Your Result</p>
                {loading ? <Loader /> : null}

                <p className="font-weight-light" key={0}>
                    You have calculated area of {shapeData.name}, below is your result
                </p>

                <p className="h4 py-5">
                    The area is &asymp; <Area />
                </p>

                <div className="mt-5 d-flex justify-content-between">
                    <button
                        disabled
                        className=" btn flex-fill btn-green font-weight-bold w-50 mr-2"
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        className="btn flex-fill  bg-white font-weight-bold w-50 ml-2"
                        onClick={(e) => {
                            setStep("selectShape");
                            setSelectedShape(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
