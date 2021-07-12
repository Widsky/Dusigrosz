import React, {useEffect, useState} from "react";
import "../scss/main.scss"
import {Summary} from "./summary";


export function Expansion({rest, summary, amountOfExpenses, expenses, value, percentage, setSummary}) {
    const [savings, setSavings] = useState(0);
    const [pleasure, setPleasure] = useState(0);
    const [investments, setInvestments] = useState(0);
    const [education, setEducation] = useState(0);
    const [percent, setPercent] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/expansion', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((expansionElements) => {
                setPercent(expansionElements.map(el => {
                    return el.percent;
                }))
                expansionElements.forEach((el, i) => {
                    if (i === 0) {
                        return setSavings(() => el.amount)
                    } else if (i === 1) {
                        return setPleasure(() => el.amount)
                    } else if (i === 2) {
                        return setInvestments(() => el.amount)
                    } else if (i === 3) {
                        return setEducation(() => el.amount)
                    }
                })

            })
    }, []);

    const handleChange = () => {
        setSavings(() => rest * document.querySelector(".savings").value / 100);

        setPleasure(() => rest * document.querySelector(".pleasure").value / 100);

        setInvestments(() => rest * document.querySelector(".investments").value / 100);

        setEducation(() => rest * document.querySelector(".education").value / 100);
    };

    return (
        <>
            <section className="dev">
                <h2 className="dev__title">ROZWÓJ</h2>

                <p className="dev__desc">Kapitał do podziału: {rest} zł</p>

                <div className="dev__column__container">
                    <div className="dev__column">
                        <div className="dev__title__container">
                            <h3 className="dev__column__title">Oszczędności </h3>
                            <input id="savings" type="number" className="dev__input savings" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[0]}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {savings} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container">
                            <h3 className="dev__column__title">Przyjemności </h3>
                            <input type="number" className="dev__input pleasure" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[1]}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {pleasure} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container dev__title__container--bg">
                            <h3 className="dev__column__title">Inwestycje </h3>
                            <input type="number" className="dev__input investments" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[2]}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {investments} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container">
                            <h3 className="dev__column__title">Edukacja </h3>
                            <input type="number" className="dev__input education" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[3]}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {education} zł</span>
                    </div>
                </div>


            </section>

            <Summary summary={summary} amountOfExpenses={amountOfExpenses} savings={savings} pleasure={pleasure} investments={investments} education={education} />
        </>
    );
}
