import React, {useEffect, useState} from "react";
import "../scss/main.scss"

export const History = () => {
    const [historySummary, setHistorySummary] = useState({
        income: 0,
        expenses: 0,
        savings: 0,
        pleasure: 0,
        investments:0,
        education: 0
    });



    return (
        <>
            <h4 className="summary__title">HISTORIA</h4>

            <form className="summary__form history__form">
                <label className="summary__label">
                    <h3 className="summary__month">Wybierz miesiąc</h3>
                    <select className="history__select">
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
            </form>

            <ul className="summary__list">
                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Przychody </span>
                    <span className='summary__list__elem__price sum__income'>{historySummary.income} zł</span></li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Wydatki </span>
                    <span className='summary__list__elem__price sum__expenses'>{historySummary.expenses} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Oszczędności </span>
                    <span className='summary__list__elem__price sum__savings'>{historySummary.savings} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Przyjemności </span>
                    <span className='summary__list__elem__price sum__pleasure'>{historySummary.pleasure} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Inwestycje </span>
                    <span className='summary__list__elem__price sum__investments'>{historySummary.investments} zł</span>
                </li>

                <li className="summary__list__elem">
                    <span className="summary__list__elem__name">Edukacja </span>
                    <span className='summary__list__elem__price sum__education'>{historySummary.education} zł</span>
                </li>
            </ul>
        </>
    )
};
