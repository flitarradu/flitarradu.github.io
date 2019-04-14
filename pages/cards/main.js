//Cautam 6 img
//Cautam si un spate de carte
//Dublam imaginile
//Amestecam imaginile
//Cream un grid de carti (randam in html)
//Tratam click pe imagine
//Sa tratam al doilea click (verificam daca imaginile deja intoarse sunt pereche sau nu, dupa ce expira un timer le intoarcem sau nu cu fata in jos)
//Game end
//Contorizare incercari

class Game {
    constructor(noCards = 6) {
      this.noCards = noCards;
      this.cards;  
      this.flippedCards;
      this.foundPairs;
      this.triesCounter;
      
      this.handleFlip = this.handleFlip.bind(this);

      document.addEventListener('cardFlip', this.handleFlip);

      
    }
    
    init (){
      this.emptyDiv();
      this.flippedCards = [];
      this.foundPairs = 0;
      this.triesCounter = 0;
      this.createCardsArr();
      this.doubleCards();
      this.shuffleCards();
      this.renderCards();
    }

    emptyDiv(){
        const gameDiv = document.querySelector('.theDiv');
        gameDiv.innerHTML = ''; 
    }
   
    createCardsArr (){ 
      this.cards = [];
      for(let i = 1; i <= this.noCards; i++){
         this.cards.push(i);
      }
    }
    
    doubleCards (){
      this.cards = [...this.cards, ...this.cards];
    }
    
    shuffleCards (){
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
    
    renderCards (){
      const fragment = document.createDocumentFragment();
      for(let type of this.cards){
        const card = new Card(type);
        fragment.appendChild(card);
      }
      
      document.querySelector('.theDiv').appendChild(fragment);

    }
    
    handleFlip(e){  
      this.flippedCards.push(e.detail.card);
      if (this.flippedCards.length === 2){
        this.triesCounter++;
        this.compareCards();
      }
    }
    
    compareCards (){
        // sa transmitem this-ul correct din setTimeout - de facut
      if ( this.flippedCards[0].type !== this.flippedCards[1].type ){

        const clonedFlippedCards = [...this.flippedCards];
        setTimeout( () => {      
            clonedFlippedCards[0].flipFaceDown();
            clonedFlippedCards[1].flipFaceDown();
        }, 2000);
        } else {
            this.foundPairs++;
            if(this.foundPairs === this.noCards){
                this.gameEnd();
            }
        }
    this.flippedCards = [];
      
    }

    
    gameEnd(){        
        setTimeout( () => {      
            alert(`Game finished in ${this.triesCounter} tries!`);
    }, 0);
        
    }


    
  }
  
  class Card {
    constructor(type){
      const theDiv = document.createElement("div");
      theDiv.classList.add("card");

      this.flipFaceUp = this.flipFaceUp.bind(this);
      theDiv.addEventListener("click", this.flipFaceUp)

      this.type = type;
      this.elem = theDiv;

      return theDiv;
    }

    flipFaceDown(){
        this.elem.classList.remove(`card${this.type}`);
        
      }    
    flipFaceUp(){
      this.elem.classList.add(`card${this.type}`);
      
      const flipEvent = new CustomEvent('cardFlip', {
          detail: {card: this}
        });
      document.dispatchEvent(flipEvent);
    }
    
  }
  
const game = new Game();

const playButton = document.querySelector('.playButton');
  
playButton.addEventListener("click", game.init.bind(game));

// function startFct(){
//     console.log('click');
//     const gameDiv = document.querySelector('.theDiv');
//     gameDiv.innerHTML = '';
//     game.init();
// }



  // de implementat contorul de incercari - ai castigat jocul in X incercari - Done
  // de afisat la sfarsit (in gameEnd) - Done
  // sub carti facem un buton de new game, care incarca un joc nou - De facut in HTML (sa nu apara cartile dupa buton) - Done
  // sa facem ultima carte sa se vada (inainte de alert)
  // reparat jocul (daca poti)