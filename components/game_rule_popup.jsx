import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GameRulePopupModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  },[]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ExampleTile = ({ letter, state }) => {
    const getBackgroundColor = () => {
      switch (state) {
        case "correct":
          return "bg-green-500";
        case "present":
          return "bg-yellow-500";
        case "absent":
          return "bg-gray-600";
        default:
          return "bg-gray-800";
      }
    };

    return (
      <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-2 border-gray-400 font-bold text-lg md:text-xl ${getBackgroundColor()} text-white`}>
        {letter}
      </div>
    );
  };

  const ExampleWord = ({ word, states }) => {
    return (
      <div className="flex gap-1 my-2">
        {word.split("").map((letter, idx) => (
          <ExampleTile key={idx} letter={letter} state={states[idx]} />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-center text-primary mb-4">How to Play Wordle</h2>
          <div className="border-b border-border mb-6"></div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Basic Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Guess the WORDLE in six tries.</li>
                <li>Each guess must be a valid five-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
                <li>You have six attempts to guess the word correctly.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Letter Colors Guide</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <ExampleWord word="WEARY" states={["correct", "absent", "absent", "absent", "absent"]} />
                  <p className="text-foreground"><span className="font-semibold">W</span> is in the word and in the correct spot.</p>
                </div>
                
                <div className="space-y-1">
                  <ExampleWord word="PILOT" states={["absent", "present", "absent", "absent", "absent"]} />
                  <p className="text-foreground"><span className="font-semibold">I</span> is in the word but in the wrong spot.</p>
                </div>
                
                <div className="space-y-1">
                  <ExampleWord word="VAGUE" states={["absent", "absent", "absent", "absent", "absent"]} />
                  <p className="text-foreground">None of these letters are in the word in any spot.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Example Game</h3>
              <p className="text-foreground mb-3">Here's an example of a game in progress:</p>
              
              <div className="space-y-2">
                <ExampleWord word="CRANE" states={["absent", "absent", "correct", "absent", "present"]} />
                <ExampleWord word="TOILS" states={["absent", "present", "absent", "absent", "correct"]} />
                <ExampleWord word="SPORE" states={["correct", "present", "absent", "correct", "correct"]} />
                <ExampleWord word="SPOKE" states={["correct", "correct", "correct", "correct", "correct"]} />
              </div>
              
              <p className="text-foreground mt-2">The player guessed SPOKE correctly in 4 attempts!</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Tips & Strategy</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Start with a word that has common letters (E, A, R, T, S).</li>
                <li>Pay attention to which letters are eliminated.</li>
                <li>Use revealed positions and letters to narrow down possibilities.</li>
                <li>Remember, letters can appear multiple times in a word.</li>
                <li>Each day brings a new Wordle puzzle!</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-foreground mb-3">Additional Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>The game uses American English spelling.</li>
                <li>Hard Mode forces you to use revealed hints in subsequent guesses.</li>
                <li>All your guesses must be valid words in the game's dictionary.</li>
                <li>Your game progress is saved if you leave and return later.</li>
              </ul>
            </section>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-primary">Good luck and have fun!</p>
          </div>
        </div>
      </div>
    </div>
  );
}