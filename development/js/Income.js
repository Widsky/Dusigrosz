import React, {useState} from "react";
import "../scss/main.scss"

import validator from 'validator';

import {Expenses} from "./Expenses";

export function Income() {
    const [summary, setSummary] = useState(0);
    const [error, setError] = useState(false);

    const handleChange = () => {
        setError(false);

        if(validator.isEmpty(document.querySelectorAll('.income__input')[0].value) || validator.isEmpty(document.querySelectorAll('.income__input')[1].value)){
            return setError(true);
        }
        let a = parseInt(document.querySelectorAll('.income__input')[0].value);
        let b = parseInt(document.querySelectorAll('.income__input')[1].value);

        setSummary(() => {
            return a + b;
        })
    }

    return (
        <>
            <section className="income">
                <h2 className="income__title">PRZYCHODY</h2>
                <form className="income__column__container">
                    <div className="income__column">
                        <span className="income__column__title">Kwota wypłaty</span>
                        <input type="number" className="income__input" min="0" placeholder="Kwota netto" onInput={handleChange} defaultValue={0}/>
                    </div>

                    <div className="income__column">
                        <span className="income__column__title">Pozostałości z poprzedniego miesiąca</span>
                        <input type="number" className="income__input" min="0" placeholder="Kwota netto" onInput={handleChange} defaultValue={0}/>
                    </div>
                </form>
                {(error ? <p className="error">Wpisz wartość do obu pól!</p> : false)}
            </section>

            <Expenses summary={summary}/>
        </>
    );
}
