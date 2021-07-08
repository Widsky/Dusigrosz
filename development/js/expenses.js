import React, {useEffect, useState} from "react";
import "../scss/main.scss"
import {Expansion} from "./expansion";

const ExpensesElement = ({expenses}) => {
    return (
        <>
            {
                expenses.map((el) => {
                    if (el.id > 3) {
                        return <label className="expense__elem" key={el.id}>
                            <h2 className="expense__name">{el.name}</h2>
                            <input className="expense__price" type="number" defaultValue={el.price} min="0"
                                   max="1000000000000000000000000"/>
                        </label>
                    }
                })
            }
        </>
    );
};


export function Expenses({summary, value}) {
    const [amountOfExpenses, setAOF] = useState(0);//suma wydatków
    const [percentage, setPercentage] = useState(0);//procent wydatków
    const [rest, setRest] = useState(0);//reszta z wypłaty przekazywana do development
    const [expenses, setExpenses] = useState([]);//tablica z wartościami wszystkich wydatków

    useEffect(() => {
        fetch('http://localhost:3000/expenses', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((expensesElements) => {
                setExpenses(expensesElements);//pobieramy wszystkie wydatki do wyświetlenia
                setPercentage(expensesElements[0].value);//pobieramy procent wydatków, który zapisany jest w obiekcie pod id 1 i index 0
                setAOF(expensesElements[1].value);//pobieramy sumę wydatków, która jest pod id 2 i index 1
                setRest(expensesElements[2].amount);
            });
    }, []);

    const handleChange = (() => {

        const allPrices = Array.from(document.querySelectorAll(".expense__price"));//tworzymy tablicę z wszystkich cen wydatków

        const allExpenses = allPrices.map((el) => {
            return parseInt(el.value);
        })//zwracamy nową tablicę z wartościami zamienionymi na typ number

        setAOF(() => {
            return allExpenses.reduce((total, value) => {
                return total + value;
            }, 0);
        });//pętla po tablicy, która sumuje wszystkie wartości z allExpenses
    });

    const percentageCounter = () => {

        setPercentage(() => {
            return (
                (amountOfExpenses / summary) * 100
            );
        });//zwracamy wartość procentową zarobków do wydatków

        setRest(() => summary - amountOfExpenses);//zwracamy resztę po odjęciu wydatków od zarobków
    };

    const showFormForNewExpense = (ev) => {
        ev.preventDefault();
        document.querySelector(".new__expense").classList.toggle("display");
        document.querySelector(".btn--dis").classList.toggle("display");
        return handleChange();
    }

    const addNewExpense = (ev) => {
        ev.preventDefault();

        if (document.querySelectorAll(".new__expense__name--input")[0].value.length <= 0) {
            return showFormForNewExpense(ev);
        }

        const newExpense = {
            name: document.querySelectorAll(".new__expense__name--input")[0].value,
            price: 0
        };

        fetch('http://localhost:3000/expenses/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExpense),
        })
            .then((res) => res.json())
            .then((expense) => {
                setExpenses((prevState) => [...prevState, expense])
            });

        document.querySelectorAll(".new__expense__name--input")[0].value = '';
        // document.querySelectorAll(".new__expense__name--input")[1].value = '';
        return showFormForNewExpense(ev);
    }

    return (
        <>
            <section className="expenses">
                <h2 className="expenses__title">WYDATKI</h2>

                <form onChange={() => handleChange()} onKeyUp={percentageCounter} className="expenses__list"
                      onClick={percentageCounter}>
                    <ExpensesElement expenses={expenses}/>
                </form>
                <form className="new__expense display" onSubmit={addNewExpense}>
                    <label className="new__expense__container">
                        <h3 className="new__expense__name">Nazwa wydatku:</h3>
                        <input type="text" minLength="1" maxLength="25" className="new__expense__name--input"
                               placeholder="Wprowadź nazwę"/>
                    </label>

                    {/*<label className="new__expense__container">*/}
                    {/*    <h3 className="new__expense__name">Kwota:</h3>*/}
                    {/*    <input className="new__expense__name--input" type="number" min="0" max="1000000000000000000000000" placeholder="Wprowadź kwotę"/>*/}
                    {/*</label>*/}
                    <div className="btn__container">
                        <button className="btn new__expense--btn btn--save" type="submit">Dodaj</button>
                        <button className="btn new__expense--btn btn--save" onClick={showFormForNewExpense}>Anuluj</button>
                    </div>
                </form>
                <button className="btn btn--dis" onClick={showFormForNewExpense}><i className="fas fa-plus"> </i>
                </button>

                <span
                    className="expenses__amount">Wydatki stanowią {percentage.toFixed(0)}% wprowadzonej kwoty, a ich suma wynosi: {amountOfExpenses} zł</span>
            </section>

            <Expansion rest={rest} summary={summary} value={value} amountOfExpenses={amountOfExpenses}
                       percentage={percentage} expenses={expenses}/>
        </>
    );
}
