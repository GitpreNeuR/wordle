'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { getUserProfile } from '@/lib/utils'
import toast from 'react-hot-toast'
import GameHeader from '@/components/game_header'
import GameRulePopupModal from '@/components/game_rule_popup'
import { useWordleKeyboard } from '@/hooks/use_wordle_keyboard'
import WordleGrid from '@/components/wordle_grid'
import { useWordleStore } from '@/hooks/use_wordle_store'
import { Button } from '@/components/ui/button'

function MainContent() {
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const{initGame,gameStatus,targetWord,gameEntries,totalWins,totalLoses}=useWordleStore();
  
  useWordleKeyboard();
  useEffect(() => {
    const initializeGame = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/auth/sign-in');
          return;
        }
        const profileData = await getUserProfile(user.id);
        if (profileData) {
          setProfile(profileData); 
          console.log('Username:', profileData?.username); 
        } else {
          toast.error('Failed to fetch user profile');
        }

        await initGame(supabase, user?.id);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [supabase, router, initGame]);

  return (
    <>
      <GameRulePopupModal/>
      <GameHeader 
        gameEntries={gameEntries} 
        avatarUrl={profile?.avatar_url} 
        gameLosses={totalLoses} 
        gameWins={totalWins} 
        username={profile?.username}
      />

      <main className="w-full min-h-[calc(100dvh-160px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md md:max-w-lg mx-auto">
         <WordleGrid/>
         {/* Game status message */}
         {gameStatus === 'won' && (
            <div className="text-center mb-4 text-green-600 font-bold">
              Congratulations! You guessed the word!
            </div>
          )}
          {gameStatus === 'lost' && (
            <div className="text-center mb-4 text-red-600 font-bold">
              Game over! The word was {targetWord}
            </div>
          )}

          {/* Restart button */}
          {(gameStatus === 'won' || gameStatus === 'lost') && (
            <div className="text-center">
              <Button onClick={initGame}>Play Again</Button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MainContent