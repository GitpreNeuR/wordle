import React from 'react'
import { useWordleStore } from '@/hooks/use_wordle_store'

function WordleGrid() {
    const{attempts,currentGuess,getLetterBoxColor}=useWordleStore();
  return (
    <div className="grid grid-rows-6 gap-2">
    {Array.from({length: 6}).map((_, attemptIdx) => (
      <div key={attemptIdx} className="grid grid-cols-5 gap-2">
        {Array.from({length: 5}).map((_, letterIdx) => {

            let content='';
            let boxColor='bg-background';

            if(attemptIdx<attempts.length){
                content=attempts[attemptIdx][letterIdx];
                const letterColor=getLetterBoxColor(attemptIdx,letterIdx);
                boxColor=letterColor=== 'correct' ? 'bg-emerald-500' : 
                letterColor ==='present' ? 'bg-yellow-500' : 'bg-gray-500';
            }
            else if(attemptIdx === attempts.length && letterIdx < currentGuess.length){
                content=currentGuess[letterIdx];
                boxColor='bg-gray-900';
                
            }
            
            return(
          <div 
            key={letterIdx} 
            className={`
              aspect-square w-full 
              flex items-center justify-center 
              font-bold rounded 
              border-2 border-foreground/40 ${boxColor}
              text-3xl sm:text-4xl
            `}
          >
            {content}
          </div>
        )})}
      </div>
    ))}
  </div>
  )
}

export default WordleGrid
