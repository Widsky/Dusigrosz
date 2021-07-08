import React, {useEffect, useState} from "react";
import "../scss/main.scss"

import {Expenses} from "./expenses";

export function Income() {
    const [summary, setSummary] = useState(0);
    const [value, setValue] = useState([]);
    const [test, setTest] = useState({val1:0, val2:0, val3:0})

    useEffect(() => {
        fetch('http://localhost:3000/income', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((income) => {
                setValue(income.map(el => {
                    return el.value;
                }));

                setSummary(income[2].value);
            });
    }, []);

    const handleChange = () => {
        let a = parseInt(document.querySelectorAll('.income__input')[0].value);
        let b = parseInt(document.querySelectorAll('.income__input')[1].value);

        setSummary(() => {
            return a + b;
        })

        // setTest(() => {
        //     return (
        //         test.val1 = parseInt(document.querySelectorAll('.income__input')[0].value),
        //         // test.val2 = 1,
        //         // test.val3 = 1,
        //         console.log(test)
        // )
        // })
    }

    return (
        <>
            <section className="income">
                <h2 className="income__title">PRZYCHODY</h2>
                <form className="income__column__container">
                    <div className="income__column">
                        <span className="income__column__title">Kwota wypłaty</span>
                        <input type="number" className="income__input" min="0" max="1000000000000000000000000"
                               placeholder="Kwota netto" onInput={handleChange} defaultValue={value[0]}/>
                    </div>

                    <div className="income__column">
                        <span className="income__column__title">Pozostałości z poprzedniego miesiąca</span>
                        <input type="number" className="income__input" min="0" max="1000000000000000000000000"
                               placeholder="Kwota netto" onInput={handleChange} defaultValue={value[1]}/>
                    </div>
                </form>
            </section>

            <Expenses summary={summary} value={value}/>
        </>
    );
}
