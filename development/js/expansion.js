import React, {useEffect, useState} from "react";
import "../scss/main.scss"

export function Expansion({rest}) {
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
    }, [])

    const handleChange = () => {
        setSavings(() => rest * document.querySelector(".savings").value/100);

        setPleasure(() => rest * document.querySelector(".pleasure").value/100);

        setInvestments(() => rest * document.querySelector(".investments").value/100);

        setEducation(() => rest * document.querySelector(".education").value/100);
    }

    return (
        <section className="dev">
            <h2 className="dev__title">Rozwój</h2>

            <p className="dev__desc">Kapitał do podziału: {rest} zł</p>

            <div className="dev__column__container">
                <div className="dev__column">
                    <span className="dev__column__title">Oszczędności </span>
                    <input type="number" className="dev__input savings" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[0]}/>
                    <span>%, co stanowi kwotę {savings} zł</span>
                </div>

                <div className="dev__column">
                    <span className="dev__column__title">Przyjemności </span>
                    <input type="number" className="dev__input pleasure" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[1]}/>
                    <span>%, co stanowi kwotę {pleasure} zł</span>
                </div>

                <div className="dev__column">
                    <span className="dev__column__title">Inwestycje </span>
                    <input type="number" className="dev__input investments" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[2]}/>
                    <span>%, co stanowi kwotę {investments} zł</span>
                </div>

                <div className="dev__column">
                    <span className="dev__column__title">Edukacja </span>
                    <input type="number" className="dev__input education" min="0" max="100" placeholder="0" onChange={handleChange} defaultValue={percent[3]}/>
                    <span>%, co stanowi kwotę {education} zł</span>
                </div>
            </div>
        </section>
    );
}
