import React from "react";

/**
 * 
 * props 
 * - data
 * - onClick 
 */
function SymbolRow(props) {
    const { data } = props;
    return (<tr>
        <td className="text-gray-900">
            {data.symbol}
            {data.isFavorite &&
                <svg className="icon icon-xs" fill="yellow" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            }
        </td>
        <td className="text-gray-900">{data.basePrecision}</td>
        <td className="text-gray-900">{data.quotePrecision}</td>
        <td className="text-gray-900">{data.minNotional}</td>
        <td className="text-gray-900">{data.minLotSize}</td>
        <td className="text-gray-900">
            <button id={`edit/${data.symbol}`} className="btn btn-secondary animate-up-2" width={32} data-bs-toggle="modal" data-bs-target="#modalSymbol" onClick={props.onClick}>
                <svg id={`edit/${data.symbol}`} className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
        </td>
    </tr>)
}

export default SymbolRow;
