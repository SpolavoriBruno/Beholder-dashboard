import React, { useEffect, useState } from 'react';

/**
 * props:
 * - onClick
 * - startDate
 * - endDate
 */
function DateFilter({ onClick, startDate, endDate }) {
    const [date, setDate] = useState({});

    function getDate(timestamp) {
        const date = timestamp ? new Date(timestamp) : new Date();
        const frm = new Intl.DateTimeFormat('en-GB').format(date);
        return frm;
    }

    function parseDate(str) {
        const split = str.split('-');
        return new Date(`${split[1]}/${split[2]}/${split[0]}`);
    }

    function onChange({ target: { id, value } }) {
        const parsedDate = parseDate(value);
        setDate({ ...date, [id]: parsedDate });
    }

    function onButtonClick(event) {
        const { startDate, endDate } = date;
        onClick({
            target: {
                id: 'dates',
                value: {
                    startDate,
                    endDate
                }
            }
        })
    }

    useEffect(() => {
        setDate({
            startDate: startDate || getDate(Date.now() - (30 * 24 * 60 * 60 * 1000)),
            endDate: endDate || getDate()
        })

    }, [startDate, endDate])

    return (
        <div className="input-group input-group-merge">
            <span className="input-group-text">
                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
            </span>
            <input className="form-control datepicker-input" id="startDate" type="date" placeholder="dd/mm/yyyy" onChange={onChange} />
            <input className="form-control datepicker-input" id="endDate" type="date" placeholder="dd/mm/yyyy" onChange={onChange} />
            <button type="button" id="btnfilter" className="btn btn-primary" onClick={onButtonClick}>
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default DateFilter;
