import { listArr } from "./local.js";
import { NOWBLOCKEL } from "./variables.js";

function addToarr(name) {
    try{
        let newCity = name;
        if(listArr.has(newCity)) {
            listArr.delete(newCity);
            NOWBLOCKEL.HEART.classList.remove('heart');
            NOWBLOCKEL.HEART.classList.add('like');
            localStorage.setItem('heart', 'like');
        } else {
            listArr.add(newCity);
            NOWBLOCKEL.HEART.classList.add('heart');
            NOWBLOCKEL.HEART.classList.remove('like');
            localStorage.setItem('heart', 'heart');
        }
    } catch(err) {
        console.log('Ошибка');
    }
}

function toggleLike(name) {
    if(listArr.has(name)) {
        NOWBLOCKEL.HEART.className = 'heart';
        localStorage.setItem('heart', 'heart');
    } else {
        NOWBLOCKEL.HEART.className = 'like';
        localStorage.setItem('heart', 'like');
    }
}

if(localStorage.getItem('heart')) {
    NOWBLOCKEL.HEART.classList.add(localStorage.getItem('heart'));
}

export  {addToarr, toggleLike};