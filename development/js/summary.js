import React, {useEffect, useState} from "react";
import "../scss/main.scss"

export const Summary = ({summary, amountOfExpenses, education, investments, pleasure, savings}) => {

    const handleShow = () => {
        document.querySelector(".summary__form").classList.toggle("display");
        document.querySelector(".summary__save").classList.toggle("display");
    };

    const handleSave = (ev) => {
        ev.preventDefault();

        fetch(`http://localhost:3000/${document.querySelector('.summary__select').value}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                income: summary,
                expenses: amountOfExpenses,
                savings: savings,
                pleasure: pleasure,
                investments: investments,
                education: education
            }),
        })
            .then((res) => res.json())
    };

    return (
        <section className="summary">
            <h4 className="summary__title">PODSUMOWANIE OSTATNICH OBLICZEŃ</h4>

            <ul className="summary__list">
                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Przychody </span>
                    <span className='summary__list__elem__price sum__income'>{summary} zł</span></li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Wydatki </span>
                    <span className='summary__list__elem__price sum__expenses'>{amountOfExpenses} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Oszczędności </span>
                    <span className='summary__list__elem__price sum__savings'>{savings} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Przyjemności </span>
                    <span className='summary__list__elem__price sum__pleasure'>{pleasure} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Inwestycje </span>
                    <span className='summary__list__elem__price sum__investments'>{investments} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Edukacja </span>
                    <span className='summary__list__elem__price sum__education'>{education} zł</span>
                </li>
            </ul>


            <form className="summary__form display">
                <label className="summary__label">
                    <h3 className="summary__month">Wybierz miesiąc</h3>
                    <select className="summary__select">
                        <option>Styczen</option>
                        <option>Luty</option>
                        <option>Marzec</option>
                        <option>Kwiecien</option>
                        <option>Maj</option>
                        <option>Czerwiec</option>
                        <option>Lipiec</option>
                        <option>Sierpien</option>
                        <option>Wrzesien</option>
                        <option>Pazdziernik</option>
                        <option>Listopad</option>
                        <option>Grudzien</option>
                    </select>
                </label>
                <div className="summary__buttons">
                    <button className="btn btn__summary" onClick={handleSave}>Zapisz</button>
                    <button className="btn btn__summary">Anuluj</button>
                </div>
            </form>


            <button className="btn btn--save summary__save" onClick={handleShow}>Zapisz</button>


        </section>
    );
}
