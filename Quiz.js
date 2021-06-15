class Quiz {
   
     
     getState() {
        var stateRef = database.ref('gameState');
        stateRef.on("value", function(data){
            GameState = data.val();
        })
 
     }
 
     update(state) {
        database.ref('/').update({
            gameState : state
        });
     }
 
     async start() {
                            
         if(GameState === 0) {
              contestant = new Contestant();
             var contestantCountRef = await database.ref('contestantCount').once("value");
 
             if(contestantCountRef.exists()) {
                 playerCount = contestantCountRef.val();
                 contestant.getCount();
             }
             question = new Question(700,175);
             question.display();
         }
     }
 
     play() {
         question.hideAllElements();
         background("rose"); 
         var topLine = createElement('h1');
         topLine.html("QUIZ - RESULTS");
         topline.position(980,35);
 
         question.getContestantInfo();
         if(allContestants !== undefined) {
             
             text("*** The contestants who answered correctly are highlighted in green.",1000,150);
             for(var contestant in allContestants) {
                 var correctAns = "3";
                 if(correctAns === allContestants[contestant].answer) {
                      fill("green");
                      textSize(20);
                      //show contestant's name also
                      text(allContestants[contestant].name,960,675);
                 }
 
                 else {
                     fill("red");
                     textSize(20);
                     text(allContestants[contestant].name,960,675);
                 }
             }
         }
      }
 }
 
 