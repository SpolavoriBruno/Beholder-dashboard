import React from "react"

function InfoBlock({ background, title, children, value: _value, precision: _precision }) {
    function getBackGround() {
        if (!background)
            return "icon-shape icon-shape-primary rounded"
        return `icon-shape icon-shape-${background} rounded`
    }

    function getValueText() {
        const precision = parseInt(_precision) || 2

        if (!_value) return 0
        const value = parseFloat(_value)
        if (!isFinite(value) || isNaN(value)) return 0

        if (value > 1000000) return (value / 1000000).toFixed(precision) + "M"
        if (value > 1000) return (value / 1000).toFixed(precision) + "K"
        if (value < 1) return (value * 1000).toFixed(precision) + "m"
        if (value < 0.0001) return (value * 1000000).toFixed(precision) + "u"
        return value.toFixed(precision)
    }

    return (
        <div className="col my-md-0 my-2">
            <div className="card boder-0 shadow">
                <div className="card-body">
                    <div className="d-block d-xl-flex">
                        <div className="d-flex justify-content-center">
                            <div className={getBackGround()}>{children}</div>
                        </div>
                        <div className="mx-3 my-md-0 my-2  text-center">
                            <h5 className="h5 text-nowrap mb-2">{title}</h5>
                            <h6 className="fw-bold mb-0">{getValueText()}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBlock;
