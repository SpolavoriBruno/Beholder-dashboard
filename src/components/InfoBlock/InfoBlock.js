import React from "react"

function InfoBlock({ background, title, children, value: _value, precision: _precision }) {
    function getBackGround() {
        if (!background)
            return "icon-shape icon-shape-primary rounded me-4 me-sm-1"
        return `icon-shape icon-shape-${background} rounded me-4 me-sm-1`
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
        <div className="col-md-4 col-sm-6 mb-3">
            <div className="card boder-0 shadow">
                <div className="card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="d-flex">
                            <div className={getBackGround()}>{children}</div>
                        </div>
                        <div className="ms-3">
                            <h5 className="h5 text-nowrap">{title}</h5>
                            <h6 className="fw-bold">{getValueText()}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBlock;
