import React,{useEffect} from 'react'
import { useWordleStore } from './use_wordle_store'

export function useWordleKeyboard() {
    const{addLetter,removeLetter,submitGuess}=useWordleStore();
    
    useEffect(()=>{
        const handleKeyDown=(e)=>{
            const key=e.key.toUpperCase();
            if(/^[A-Z]$/.test(key)){
                addLetter(key);

            }
            else if(key === 'BACKSPACE'){
                removeLetter();
            }
            else if(key === 'ENTER'){
                submitGuess();
            }
        };

        window.addEventListener('keydown',handleKeyDown);
        return()=>window.removeEventListener('keydown',handleKeyDown);
    },[addLetter,removeLetter,submitGuess]);
};

