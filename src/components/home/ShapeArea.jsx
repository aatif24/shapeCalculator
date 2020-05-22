/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../../css/style.css";
import { connect } from "react-redux";
import Loader from "../Loader";
import { loading, selectedShape, setStep, shapeData } from "../../redux/actions/index";

/**
 * function will return state managed by redux(globally)
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        loading: state.index.loading,
        selectedShape: state.index.selectedShape,
        shapeData: state.index.shapeData,
        formData: state.index.formData,
    };
};

/**
 * dispatcher function which dispatches states from action to to stores using reducer
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (payload) => dispatch(loading(payload)),
        setSelectedShape: (payload) => dispatch(selectedShape(payload)),
        getShapeInput: (payload) => dispatch(shapeData(payload)),
        setStep: (payload) => dispatch(setStep(payload)),
    };
};

/**
 * React hook function
 * @param {*} props
 */
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

    /**
     * replacing formula with field value and evaluating the are
     */
    let Area = () => {
        let sd = JSON.parse(JSON.stringify(shapeData));
        for (const key in formData) {
            var myRegExp = new RegExp("{" + key + "}", "g");
            sd.formula = sd.formula.replace(myRegExp, formData[key]);
        }
        // eslint-disable-next-line no-eval
        return eval(sd.formula).toFixed(2);
    };

    return (
        <div className="bg-yellow h-100 rounded ">
            <div className="p-5 h-100 justify-content-between flex-column d-flex">
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
                        className=" btn flex-fill btn-green font-weight-bold w-50 mr-2"
                        onClick={(e) => {
                            setStep("selectShape");
                            setSelectedShape(false);
                        }}
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
