import React, {useEffect, useState} from "react";
import "../scss/main.scss"
import {Development} from "./development";

const ExpensesElement = ({expenses}) => {
    return (
        <>
            {
                expenses.map((el) => {
                    if (el.id > 3) {
                        return <label className="expense__elem" key={el.id}>
                            <h2 className="expense__name">{el.name}</h2>
                            <input className="expense__price" type="number" defaultValue={el.price} min="0" max="1000000000000000000000000"/>
                        </label>
                    }
                })
            }
        </>
    );
};


export function Expenses({summary}) {
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
            })
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
    })

    const test = () => {
        setPercentage(() => {
            return (
                (amountOfExpenses / summary) * 100
            );
        });//zwracamy wartość procentową zarobków do wydatków

        setRest(() => summary - amountOfExpenses);//zwracamy resztę po odjęciu wydatków od zarobków
    }

    return (
        <>
            <section className="expenses">
                <h2 className="expenses__title">Wprowadź swoje wydatki</h2>

                <form onChange={() => handleChange()} onKeyUp={test} className="expenses__list">
                    <ExpensesElement expenses={expenses}/>
                </form>

                <button className="btn"><i className="fas fa-plus"> </i></button>

                <span
                    className="expenses__amount">Wydatki stanowią {percentage.toFixed(0)}% wprowadzonej kwoty, a ich suma wynosi: {amountOfExpenses} zł</span>
            </section>

            <Development rest={rest}/>
        </>
    );
}
