import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WordleLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-2">WORDLE</h1>
        <p className="text-lg text-muted-foreground">Guess the hidden word in 6 tries</p>
      </div>
      
      {/* Example Board */}
      <Card className="p-6 md:p-8 mb-8 bg-card">
        <div className="grid gap-2 mb-6">
          {/* First row - example of a partial guess */}
          <div className="grid grid-cols-5 gap-2">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary font-bold text-2xl text-white bg-emerald-500">
              W
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary font-bold text-2xl text-white bg-yellow-500">
              O
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary font-bold text-2xl text-white bg-gray-500">
              R
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary font-bold text-2xl text-white bg-emerald-500">
              D
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary font-bold text-2xl text-white bg-gray-500">
              S
            </div>
          </div>
          
          {/* Empty row examples */}
          {Array(2).fill().map((_, index) => (
            <div key={index} className="grid grid-cols-5 gap-2">
              {Array(5).fill().map((_, cellIndex) => (
                <div 
                  key={cellIndex} 
                  className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-secondary"
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Game instructions */}
        <div className="space-y-2 text-sm md:text-base mb-6">
          <p className="flex items-center gap-2">
            <span className="w-4 h-4 bg-emerald-500 inline-block"></span>
            <span>Green tile: Correct letter in correct position</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-500 inline-block"></span>
            <span>Yellow tile: Correct letter in wrong position</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-500 inline-block"></span>
            <span>Gray tile: Letter not in the word</span>
          </p>
        </div>
      </Card>
      
      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to play?</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Challenge yourself daily with a new word puzzle. Sign up to track your stats and compete with friends!
        </p>
        <Link href="/auth/sign-up" passHref>
          <Button className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up to Play
          </Button>
        </Link>
      </div>
      
      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        <p>© 2025 Wordle Game | A daily word puzzle</p>
      </div>
    </div>
  );
};

export default WordleLandingPage;
