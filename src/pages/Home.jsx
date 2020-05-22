import React from "react";

import Intro from "../components/home/Intro";
import ShapeSelector from "../components/home/ShapeSelector";
import AreaInput from "../components/home/AreaInput";
import ShapeArea from "../components/home/ShapeArea";
import VerticalBanner from "../components/home/VerticalBanner";

import { connect } from "react-redux";

/**
 * redux
 */

const mapStateToProps = (state) => {
    return {
        selectedShape: state.index.selectedShape,
        step: state.index.step,
        loading: state.index.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
const App = ({ step }) => {
    let RenderBlock = () => {
        switch (step) {
            case "selectShape":
                return <ShapeSelector />;
            case "shapeAreaInput":
                return <AreaInput />;
            case "shapeArea":
                return <ShapeArea />;

            default:
                break;
        }
    };
    return (
        <div className="container">
            <div className="row mt-2 ">
                <div className="col-lg-6">
                    <Intro />
                </div>
                <div className="col-lg-4">
                    <RenderBlock />
                </div>
                <div className="col-lg-2 ">
                    <VerticalBanner />
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
