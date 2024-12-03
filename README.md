<!-- {codigo em singleton} -->

<!--     {codigo em singleton} 

const prompt = require('prompt-sync')({ sigint: true });

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
      const guess = prompt("Digite uma letra: ").toLowerCase();

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
      console.log("\nParabéns! Você adivinhou a palavra:", this.word);
    }
  }
}

const game = Hangman.getInstance("typescript");
game.play();

-->

<!-- 
Singleton
(
introdução Singleton

O padrão Singleton é um padrão de design que garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a essa instância. Vamos ver como implementar esse padrão em TypeScript.

Propósito

O Singleton é um padrão de projeto criacional que permite a você garantir que uma classe tenha apenas uma instância, enquanto provê um ponto de acesso global para essa instância

Problema de usar Singleton 

O padrão Singleton resolve dois problemas de uma só vez, violando o princípio de responsabilidade única:
Garantir que uma classe tenha apenas uma única instância. Por que alguém iria querer controlar quantas instâncias uma classe tem? A razão mais comum para isso é para controlar o acesso a algum recurso compartilhado—por exemplo, uma base de dados ou um arquivo.
Funciona assim: imagine que você criou um objeto, mas depois de um tempo você decidiu criar um novo. Ao invés de receber um objeto fresco, você obterá um que já foi criado.

Fornece um ponto de acesso global para aquela instância. Se lembra daquelas variáveis globais que você (tá bom, eu) usou para guardar alguns objetos essenciais? Embora sejam muito úteis, elas também são muito inseguras uma vez que qualquer código pode potencialmente sobrescrever os conteúdos daquelas variáveis e quebrar a aplicação.
Assim como uma variável global, o padrão Singleton permite que você acesse algum objeto de qualquer lugar no programa. Contudo, ele também protege aquela instância de ser sobrescrita por outro código.
Há outro lado para esse problema: você não quer que o código que resolve o problema #1 fique espalhado por todo seu programa. É muito melhor tê-lo dentro de uma classe, especialmente se o resto do seu código já depende dela.
Hoje em dia, o padrão Singleton se tornou tão popular que as pessoas podem chamar algo de singleton mesmo se ele resolve apenas um dos problemas listados.

Solução de usar Singleton 

Todas as implementações do Singleton tem esses dois passos em comum:
Fazer o construtor padrão privado, para prevenir que outros objetos usem o operador new com a classe singleton.
Criar um método estático de criação que age como um construtor. Esse método chama o construtor privado por debaixo dos panos para criar um objeto e o salva em um campo estático. Todas as chamadas seguintes para esse método retornam o objeto em cache.
Se o seu código tem acesso à classe singleton, então ele será capaz de chamar o método estático da singleton. Então sempre que aquele método é chamado, o mesmo objeto é retornado.

Prós Singleton 

 Você pode ter certeza que uma classe só terá uma única instância.
 Você ganha um ponto de acesso global para aquela instância.
 O objeto singleton é inicializado somente quando for pedido pela primeira vez.

 contras Singleton 

 Viola o princípio de responsabilidade única. O padrão resolve dois problemas de uma só vez.
 O padrão Singleton pode mascarar um design ruim, por exemplo, quando os componentes do programa sabem muito sobre cada um.
 O padrão requer tratamento especial em um ambiente multithreaded para que múltiplas threads não possam criar um objeto singleton várias vezes.
 Pode ser difícil realizar testes unitários do código cliente do Singleton porque muitos frameworks de teste dependem de herança quando produzem objetos simulados. Já que o construtor da classe singleton é privado e sobrescrever métodos estáticos é impossível na maioria das linguagem, você terá que pensar em uma maneira criativa de simular o singleton. Ou apenas não escreva os testes. Ou não use o padrão Singleton.

Tradução:

Singleton: Solitário ou Único.
Padrão de Projeto Singleton: Um padrão de design que assegura que uma classe tenha apenas uma instância única em toda a aplicação.

meu ponto de vista Singleton 

Singleton é um tipo de padrão bom de trabalhar , mas por ser único tem suas limitações e isso fica ruim pra trabalhos grandes e complexos . Se for um trabalho pequeno e básico é bom de se usar .

)
 -->

<!--                 {codigo em Prototype}

const prompt = require('prompt-sync')({ sigint: true });

function Hangman(word) {
  this.word = word.toLowerCase();
  this.guessedLetters = new Set();
  this.wrongGuesses = 0;
  this.maxGuesses = 6;
  this.displayWord = Array(this.word.length).fill('_');
}

Hangman.prototype.updateDisplayWord = function(letter) {
  for (let i = 0; i < this.word.length; i++) {
    if (this.word[i] === letter) {
      this.displayWord[i] = letter;
    }
  }
};

Hangman.prototype.play = function() {
  console.log("Bem-vindo ao Jogo da Forca!");
  while (this.wrongGuesses < this.maxGuesses && this.displayWord.includes('_')) {
    console.log(`\nPalavra: ${this.displayWord.join(' ')}`);
    console.log(`Letras erradas: ${this.wrongGuesses}/${this.maxGuesses}`);
    const guess = prompt("Digite uma letra: ").toLowerCase();

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
    console.log("\nParabéns! Você adivinhou a palavra:", this.word);
  }
};

const game = new Hangman("typescript");
game.play();
-->

<!--   
introdução Prototype

O Prototype é um padrão de projeto criacional que permite copiar objetos existentes sem fazer seu código ficar dependente de suas classes.

Prototype Problema

Digamos que você tenha um objeto, e você quer criar uma cópia exata dele. Como você o faria? Primeiro, você tem que criar um novo objeto da mesma classe. Então você terá que ir por todos os campos do objeto original e copiar seus valores para o novo objeto.
Legal! Mas tem uma pegadinha. Nem todos os objetos podem ser copiados dessa forma porque alguns campos de objeto podem ser privados e não serão visíveis fora do próprio objeto.
Há ainda mais um problema com a abordagem direta. Uma vez que você precisa saber a classe do objeto para criar uma cópia, seu código se torna dependente daquela classe. Se a dependência adicional não te assusta, tem ainda outra pegadinha. Algumas vezes você só sabe a interface que o objeto segue, mas não sua classe concreta, quando, por exemplo, um parâmetro em um método aceita quaisquer objetos que seguem uma interface.

Prototype Solução

O padrão Prototype delega o processo de clonagem para o próprio objeto que está sendo clonado. O padrão declara um interface comum para todos os objetos que suportam clonagem. Essa interface permite que você clone um objeto sem acoplar seu código à classe daquele objeto. Geralmente, tal interface contém apenas um único método clonar.
A implementação do método clonar é muito parecida em todas as classes. O método cria um objeto da classe atual e carrega todos os valores de campo para do antigo objeto para o novo. Você pode até mesmo copiar campos privados porque a maioria das linguagens de programação permite objetos acessar campos privados de outros objetos que pertençam a mesma classe.
Um objeto que suporta clonagem é chamado de um protótipo. Quando seus objetos têm dúzias de campos e centenas de possíveis configurações, cloná-los pode servir como uma alternativa à subclasses.

Prós

 Você pode clonar objetos sem acoplá-los a suas classes concretas.
 Você pode se livrar de códigos de inicialização repetidos em troca de clonar protótipos pré-construídos.
 Você pode produzir objetos complexos mais convenientemente.
 Você tem uma alternativa para herança quando lidar com configurações pré determinadas para objetos complexos.

  contras

 Clonar objetos complexos que têm referências circulares pode ser bem complicado.

Tradução:
 
 Inglês: Prototype
Português: Protótipo

meu ponto de vista Prototype

-->