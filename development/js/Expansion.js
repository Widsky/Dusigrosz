import React, {useState} from "react";
import "../scss/main.scss"
import {Summary} from "./Summary";


export function Expansion({rest, summary, amountOfExpenses}) {
    const [savings, setSavings] = useState(0);
    const [pleasure, setPleasure] = useState(0);
    const [investments, setInvestments] = useState(0);
    const [education, setEducation] = useState(0);

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
                            <input id="savings" type="number" className="dev__input savings" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={0}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {savings} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container">
                            <h3 className="dev__column__title">Przyjemności </h3>
                            <input type="number" className="dev__input pleasure" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={0}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {pleasure} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container dev__title__container--bg">
                            <h3 className="dev__column__title">Inwestycje </h3>
                            <input type="number" className="dev__input investments" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={0}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {investments} zł</span>
                    </div>

                    <div className="dev__column">
                        <div className="dev__title__container">
                            <h3 className="dev__column__title">Edukacja </h3>
                            <input type="number" className="dev__input education" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={0}/>%
                        </div>
                        <span className="dev__column__amount">Kwota {education} zł</span>
                    </div>
                </div>


            </section>

            <Summary summary={summary} amountOfExpenses={amountOfExpenses} savings={savings} pleasure={pleasure} investments={investments} education={education} />
        </>
    );
}
