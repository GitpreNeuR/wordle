import { create } from "zustand";

const GUESS_WORD_LIST = ['REACT', 'BLISS', 'STACK', 'QUEUE', 'GAMES', 'FRAME', 'ABYSS', 'DEBUG'];


export const useWordleStore = create((set,get) => ({
    targetWord: '',
    currentGuess: '0',
    attempts: [],
    gameStatus: 'playing', //playing,won,lost
    letterStatus: {},
    gameEntries: 0,
    totalWins: 0,
    totalLoses: 0,


    //Initializing the hgame

    initGame: async (supabase, userId) => {

        const randomTargetWord = GUESS_WORD_LIST[Math.floor(Math.random() * GUESS_WORD_LIST.length)];

        if (userId) {
            try {
                const { error } = await supabase.from('game_sessions').insert({
                    user_id: userId,
                    target_word: randomTargetWord
                });


                if (!error) {
                    //updating the local state with freshe data
                    const { data: profileData } = await supabase.from('profiles').select('game_entries,total_wins,total_losses').eq('id', userId).single();

                    set({

                        gameEntries: profileData?.game_entries ,
                        totalWins: profileData?.total_wins ,
                        totalLoses: profileData?.total_losses ,

                    });
                }
            }
            catch (error) {
                console.error('ERROR RECORDING GAME SESSION', error);
            }
        }
        set({
            targetWord: randomTargetWord,
            currentGuess: '',
            attempts: [],
            gameStatus: 'playing',
            letterStatus: {}
        });
    },


    //GAME ACTIONS
    addLetter:(letter)=>set((state)=>{
        if(state.gameStatus !== 'playing' || state.currentGuess.length >= 5) return{};
        return {currentGuess : state.currentGuess + letter};
    }),

    removeLetter: () => set((state) => {
        if (state.gameStatus !== 'playing' || state.currentGuess.length === 0) return {};
        return { currentGuess: state.currentGuess.slice(0, -1) };
      }),

    getLetterBoxColor:(attempIdx,letterIdx)=>{
        const state=get();

        //base case if no letter
        if(attempIdx >=state.attempts.length) return 'empty';

        const letter=state.attempts[attempIdx][letterIdx];
        if(state.targetWord[letterIdx] === letter){
            return 'correct';
        }
        else if(state.targetWord.includes(letter)){
            return 'present';
        }
        else{
            return 'absent';
        }

        


    },

    submitGuess:(supabase,userId)=>set((state)=>{
        if(state.currentGuess.length <5 || state.gameStatus !== 'playing')
            return;

        

        const newAttempts=[...state.attempts,state.currentGuess];
        const newLetterStatus={...state.letterStatus};
        //update the letter status
        for(let i=0;i<state.currentGuess.length;i++){
            const letter=state.currentGuess[i];

            if(state.targetWord[i] === letter){
                newLetterStatus[letter]='correct';
            }

            else if(state.targetWord.includes(letter) && newLetterStatus[letter] !== 'correct'){
                newLetterStatus[letter]='present';
            }
            else if (!newLetterStatus[letter]) {
                newLetterStatus[letter] = 'absent';
              }
        
        }




        //CHECK 4 GAME STATSUS
        let statsUpdate={};
        let newGameStatus=state.gameStatus;
        if (state.currentGuess === state.targetWord) {
            newGameStatus = 'won';
            statsUpdate={totalWins:state.totalWins+1};
          } else if (newAttempts.length >= 6) {
            newGameStatus = 'lost';
            statsUpdate={totalLoses:state.totalLoses+1};
          }

          //updating the profiles
          
          
          return {
            attempts: newAttempts,
            currentGuess: '',
            letterStatus: newLetterStatus,
            gameStatus: newGameStatus,
            ...statsUpdate
          };

    })
}))