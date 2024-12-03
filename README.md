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

## Problemas Comuns no Padrão Prototype

O padrão Prototype, apesar de ser uma ferramenta poderosa para criar objetos, apresenta alguns desafios que precisam ser considerados durante sua implementação. Vamos explorar três dos principais problemas:

### 1. Clonar Objetos: Uma Tarefa Delicada

* Objetos Complexos: Ao lidar com objetos que possuem estruturas complexas, com diversas referências a outros objetos, a clonagem pode se tornar uma tarefa árdua e propensa a erros. É preciso garantir que todas as referências sejam copiadas corretamente, evitando a criação de referências circulares ou a compartilha de objetos entre o original e a cópia.
* Objetos Mutáveis: Se o objeto original for mutável, qualquer modificação feita na cópia também pode afetar o objeto original, a menos que uma cópia profunda seja realizada. Isso pode levar a comportamentos inesperados e difíceis de depurar.
* Performance: A clonagem de objetos pode ser uma operação custosa em termos de desempenho, especialmente para objetos grandes ou complexos. É importante avaliar o impacto da clonagem na performance da aplicação.

### 2. Campos Privados: Um Obstáculo à Clonagem

* Inacessibilidade: Campos privados não são diretamente acessíveis de fora da classe, o que dificulta a cópia de seus valores durante a clonagem. É necessário utilizar mecanismos como reflexão ou métodos de acesso para copiar esses campos, o que pode comprometer a encapsulação.
* Complexidade: A implementação de mecanismos para copiar campos privados pode aumentar a complexidade do código e torná-lo mais difícil de entender e manter.

### 3. Dependência de Classe: Aumentando o Acoplamento

* Acoplamento: Ao utilizar o padrão Prototype, o código que cria cópias de objetos fica acoplado à classe do objeto que está sendo clonado. Isso pode dificultar a reutilização e a manutenção do código, pois qualquer alteração na classe original pode exigir modificações no código que utiliza o padrão Prototype.
* **Flexibilidade:** A dependência de classe pode limitar a flexibilidade do sistema, tornando mais difícil introduzir novas classes ou modificar as existentes.

Mitigando os Problemas:

Para minimizar os problemas associados ao padrão Prototype, algumas técnicas podem ser utilizadas:

* Clonagem Profunda: Realizar uma cópia profunda dos objetos, garantindo que todas as referências sejam copiadas e que não haja compartilhamento de objetos entre o original e a cópia.
* Métodos de Clonagem: Definir um método de clonagem dentro da classe, permitindo um controle mais preciso sobre o processo de cópia e facilitando a inclusão de lógica específica para cada tipo de objeto.
* Interfaces de Clonagem: Criar uma interface de clonagem para permitir que diferentes classes implementem seus próprios mecanismos de clonagem, aumentando a flexibilidade e a reusabilidade.
* Serialização: Utilizar mecanismos de serialização para converter o objeto em uma representação em bytes e, em seguida, desserializar essa representação para criar uma nova cópia.

*Conclusão

O padrão Prototype é uma ferramenta poderosa, mas é importante estar ciente de suas limitações e desafios. Ao compreender os problemas comuns e aplicar as técnicas adequadas, você pode utilizar o padrão Prototype de forma eficaz em seus projetos.




Vantagens do Padrão Prototype
O padrão Prototype oferece uma maneira eficiente e flexível de criar novos objetos a partir de um protótipo existente. Vamos explorar as principais vantagens, divididas em tópicos:

1. Interface Comum
Simplificação: Define uma interface comum para todos os objetos que podem ser clonados, facilitando a criação de cópias de diferentes tipos de objetos.
Reutilização: Permite que diferentes clientes utilizem o mesmo mecanismo de clonagem, sem a necessidade de conhecer os detalhes internos da classe a ser clonada.
2. Método Clonar
Encapsulamento: O processo de clonagem é encapsulado dentro do próprio objeto, permitindo que cada classe implemente sua própria lógica de clonagem de forma personalizada.
Flexibilidade: Permite criar cópias superficiais ou profundas, dependendo da necessidade.
3. Protótipo
Eficiência: Ao utilizar um protótipo, evita-se a necessidade de recriar objetos complexos a partir do zero, o que pode ser mais eficiente em termos de tempo e recursos.
Personalização: Permite criar diferentes variações de um objeto a partir de um protótipo básico, através de pequenas modificações.
Em resumo, o padrão Prototype oferece as seguintes vantagens:

Flexibilidade: Permite criar objetos de forma dinâmica e personalizada.
Reusabilidade: Facilita a criação de cópias de objetos complexos, reduzindo a quantidade de código repetitivo.
Eficiência: Pode melhorar o desempenho em cenários onde a criação de objetos é uma operação custosa.
Encapsulamento: Oculta a complexidade da clonagem dentro da classe, tornando o código mais limpo e fácil de manter.
Quando usar o padrão Prototype?

Criação de objetos complexos: Quando a criação de um objeto envolve muitas etapas e configurações.
Cópias de objetos: Quando você precisa criar várias cópias de um mesmo objeto com pequenas variações.
Configurações diferentes: Quando você precisa criar objetos com configurações diferentes a partir de um protótipo básico.
Em resumo, o padrão Prototype é uma ferramenta poderosa para criar objetos de forma eficiente e flexível, tornando o código mais reutilizável e fácil de manter.

Tradução:
 
 Inglês: Prototype
Português: Protótipo

meu ponto de vista Prototype

-->
