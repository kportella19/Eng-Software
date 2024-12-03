const promptSync = require('prompt-sync')({ sigint: true });

class Hangman {
  private static instance: Hangman;
  private word: string;
  private guessedLetters: Set<string>;
  private wrongGuesses: number;
  private maxGuesses: number;
  private displayWord: string[];

  private constructor(word: string) {
    this.word = word.toLowerCase();
    this.guessedLetters = new Set();
    this.wrongGuesses = 0;
    this.maxGuesses = 6;
    this.displayWord = Array(this.word.length).fill('_');
  }

  public static getInstance(word: string): Hangman {
    if (!Hangman.instance) {
      Hangman.instance = new Hangman(word);
    }
    return Hangman.instance;
  }

  private updateDisplayWord(letter: string) {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        this.displayWord[i] = letter;
      }
    }
  }

  public play() {
    console.log("Bem-vindo ao Jogo da Forca!");
    while (this.wrongGuesses < this.maxGuesses && this.displayWord.includes('_')) {
      console.log(`\nPalavra: ${this.displayWord.join(' ')}`);
      console.log(`Letras erradas: ${this.wrongGuesses}/${this.maxGuesses}`);
      const guess = promptSync("Digite uma letra: ").toLowerCase();

      if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        console.log("Por favor, digite uma única letra.");
        continue;
      }

      if (this.guessedLetters.has(guess)) {
        console.log("Você já adivinhou essa letra. Tente outra.");
        continue;
      }

      this.guessedLetters.add(guess);

      if (this.word.includes(guess)) {
        this.updateDisplayWord(guess);
      } else {
        this.wrongGuesses++;
      }
    }

    if (this.wrongGuesses === this.maxGuesses) {
      console.log("\nVocê perdeu! A palavra era:", this.word);
    } else {
      console.log("\nParabéns! Você adivinhou a palavra:", this.displayWord.join(''));
    }
  }
}

const game = Hangman.getInstance("typescript");
game.play();