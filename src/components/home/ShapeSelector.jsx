/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../css/style.css";
import { connect } from "react-redux";
import Loader from "../Loader";
import { validateShapeSelection } from "../../helpers";
import { shapes, loading, selectedShape, setStep } from "../../redux/actions/index";

/**
 * function will return state managed by redux(globally)
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        shapeList: state.index.shapes,
        loading: state.index.loading,
    };
};

/**
 * dispatcher function which dispatches states from action to to stores using reducer
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        getShapeList: (payload) => dispatch(shapes(payload)),
        setLoading: (payload) => dispatch(loading(payload)),
        setSelectedShape: (payload) => dispatch(selectedShape(payload)),
        setStep: (payload) => dispatch(setStep(payload)),
    };
};

/**
 * React hook function
 * @param {*} props
 */
const App = ({ getShapeList, shapeList, loading, setSelectedShape, setStep }) => {
    useEffect(() => {
        getShapeList();
    }, []);

    const [formError, setFormError] = useState({});

    let submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        let data = {
            shape: formData.get("shape"),
        };
        // validating the dynamic inputs
        // all are required
        let { status, errorObject } = validateShapeSelection(data);
        if (!status) {
            setFormError(errorObject);
            return;
        }
        setSelectedShape(data.shape);
        setStep("shapeAreaInput");
        return;
    };
    return (
        <div className="bg-yellow h-100 rounded ">
            <div className="p-5 h-100 ">
                <p className="h5 font-weight-bold mb-4">Step 1 - Select Your Shape</p>
                {loading ? <Loader /> : null}
                <form
                    id="selector-form"
                    name="shapeSelector"
                    className=""
                    onSubmit={(e) => {
                        submitForm(e);
                    }}
                >
                    {shapeList && shapeList.length
                        ? shapeList.map((v, i) => {
                              return (
                                  <div className="input-group py-2" key={i}>
                                      <input
                                          type="radio"
                                          id={v.name}
                                          name="shape"
                                          value={v.id}
                                          className="p-3"
                                      />
                                      <label
                                          htmlFor={v.name}
                                          className="px-3 h5 font-weight-light text-capitalize"
                                      >
                                          {v.name}
                                      </label>
                                  </div>
                              );
                          })
                        : null}

                    <small className="text-capitalize text-danger">
                        {formError && formError.shape}
                    </small>
                    {shapeList && shapeList.length ? (
                        <div className="mt-5 d-flex justify-content-between">
                            <button className="btn flex-fill btn-green font-weight-bold w-50 mr-2">
                                Next
                            </button>
                            <button
                                type="button"
                                className="btn flex-fill  bg-white font-weight-bold w-50 ml-2"
                                onClick={(e) => {
                                    setSelectedShape(false);
                                    document.getElementById("selector-form").reset();
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
