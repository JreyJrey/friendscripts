 // hides the main container  
 $(window).on( "load", function(){
  $(".mainContain").hide();
  $(".newStory").hide();
  $(".joinStory").hide();
  $(".readStory").hide();

})


  // removes landing page stuff and shows main container
  $("#editStoryButt").on("click", function(event){
    $(".mainContain").show();
    $(".landingPage").hide();
    $(".joinStory").hide();
    lexical(".adLib-input");
  })

  // New Story On Click Function
  $(".newStoryButt").click(function(event){
    $(".newStory").show();
    $(".landingPage").hide();
    $(".mainContain").hide();
    $(".joinStory").hide();
    $(".readStory").hide();
  })

    $(".prompt-Lib").readRemaining();

  // Join Story Button Function
  $(".joinStoryButt").click(function(event){
    $(".joinStory").show();
    $(".landingPage").hide();
    $(".mainContain").hide();
    $(".newStory").hide();
    $(".readStory").hide();
  });

 // Read Story Button Function
 $(".readStoryButt").click(function(event){

  $(".readStory").show();
  $(".landingPage").hide();
  $(".mainContain").hide();
  $(".newStory").hide();
  $(".joinStory").hide();
});

    $(".speakStoryButt").click(function(event){
      responsiveVoice.speak(storyPath.storyPrompt+" "+storyPath.adLibArray.join(''), "UK English Female", {pitch: 1, rate: 0});
    })


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3tLpkNwJljywfHXOfJiiLmKuyHyKoS50",
    authDomain: "friendscripts.firebaseapp.com",
    databaseURL: "https://friendscripts.firebaseio.com",
    projectId: "friendscripts",
    storageBucket: "friendscripts.appspot.com",
    messagingSenderId: "834536402255"
  };
  firebase.initializeApp(config);

    // Initial Values
    var dataRef = firebase.database();
    var name = "";
    var email = "";
    var age = 0;
    var adLibArray = [];
    var adLib;
    var storyPrompt;

    var storyIndex;
    var storyPath;
    var randomWordLength = "";
    var maxCharCount = 150;


    // Capture Button Click
    $(".commit-Lib").on("click", function(event) {
      event.preventDefault();
      $(".prompt-Lib").empty();
      
      //Get the User Input and Trim the spaces.
      adLib = $(".adLib-input").val().trim();
      console.log($(".adLib-input").val().trim())
      // adLibArray.push(adLib);
      
      
      // Code to push the data to 
      var storiesRef = dataRef.ref().child("stories");
      storiesRef.once("value", function(snapshot) {
        var stories = snapshot.val();
        var currenStory = stories[storyIndex];
        
          var storySentences = currenStory["adLibArray"];
          var storyPrompt = currenStory["storyPrompt"]
          storySentences.push(adLib);
          console.log(storyPrompt);
          
          storiesRef.child(storyIndex+"/adLibArray").set(storySentences);
          // {
            // id: storyIdNumber,
            // storyPrompt: storyPrompt,
            // adLibArray: storySentences
            // dateAdded: firebase.database.ServerValue.TIMESTAMP
          // });

          if (storySentences.length > 0){
           var lastSentence = storySentences.length-1;
           $(".prompt-Lib").append(storySentences[lastSentence]);
         }else {
          console.log("length of array", adLibArray.length);
        };

        

      });
      //Clear out the user Input Text Field
      $(".adLib-input").val("");
      $(".prompt-Lib").empty();
      $(".thumbStyle").empty();
    // }
  });

  // Mark turned "lexical" into a function so we can easily call it and pass in different classes of adLib-input
  function lexical(adlibArg, char){
    $(".lexical").click(function(){
      var currentText = $(adlibArg).val();
      $(adlibArg).empty();
      var lexical = $(this).attr("lexicalCategory");
      var queryURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech="+lexical+"&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
      $.ajax({
        type: "GET",
        url: queryURL,
        data: config,
        success: function(data) {console.log(data);},
        error: function(response) {console.log(response);}
      })
      .done(function(data) {

        var randomWord = data.word;
        randomWordLength = randomWord.length;
        var length = $(adlibArg).val().length;
        var charRemain = maxCharCount - length;

        if (charRemain > randomWordLength) {
          $(adlibArg).val(currentText + data.word+" ");
          $(char).text("Characters Remaining: " + charRemain);
        } else {
          $(char).text("Characters Remaining: " + charRemain);
        }
        
        $.ajax({
          type: "GET",
          url: "https://api.wordnik.com/v4/word.json/"+randomWord+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          data: config,
          success: function(data) {console.log(data[0].text);}
        })
        .done(function(data) {
          $(".thumbStyle").append(randomWord+": "+data[0].text+"<br>")
        });
      });
    });
  }

function charCount(adlibArg, char){
  $(adlibArg).keyup(function() {
    var length = $(this).val().length;
    var charRemain = maxCharCount - length;
    if (charRemain >= 0) {
        $(char).text("Characters Remaining: " + charRemain);
    }
  })
}

// New Story On Click Function
    $(".newStoryButt").click(function(event){
    lexical(".adLib-input2", "#charCount");
    charCount(".adLib-input2", "#charCount");


// Variables
var storiesRef = dataRef.ref().child("storyCounter");
var title = $(".titleUserInput");
var author = $(".authorUserInput");
var age = $(".ageUserInput");
adLib = $(".adLib-input2").val().trim();
      // console.log($(".adLib-input2").val().trim())
      adLibArray.push(adLib);

// Creates New Story Object in Firebase with a story ID.
storiesRef.once("value", function(snapshot) {
  var storyCounter = snapshot.val();
  storyCounter++;
        // var newStoryID = dataRef.ref().child('stories').orderByChild('id').equalTo(storyCounter);
        console.log(storyCounter);
        // console.log("newStoryID: "+newStoryID);
        storiesRef.set(storyCounter);
        // console.log(dataRef.ref().child("stories"));

        dataRef.ref().child("stories").push({
          id: storyCounter,
          title: "",
          author: "",
          storyPrompt: "",
          adLibArray: [""],
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Click Event for Submit Story
        $(".commitNewStory").click(function(event){

          var userTitle = $(".userTitle").val();
          console.log(userTitle);
          var userAuthor = $(".userAuthor").val();
          var adLib2 = $(".adLib-input2").val();
          var newStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(storyCounter);
          if(userTitle === ""){alert("Please Enter a Title")}
            else if(userAuthor === ""){alert("Please Enter an Author")}
              else if(adLib2 === ""){alert("Please Enter a Story Prompt")}
                else{

//This is where JOrdan Needs to find out how to look up object by Child(ID) in Firebase

newStoryID.on("value", function(snapshot) {
            // console.log(snapshot.val());
            // console.log(Object.keys(snapshot.val())[0]);
            var firebaseID = Object.keys(snapshot.val())[0];
            firebaseID = firebaseID.toString();
            // console.log(firebaseID);

            

            dataRef.ref().child("stories").child(firebaseID).update({
              title: userTitle,
              author: userAuthor,
              storyPrompt: adLib2,
              adLibArray: [""],
            });
          });
};
});

      });


});

$(".joinStoryButt").click(function(){
  $(".editStoryDiv").empty();
  var storyCounterRef = dataRef.ref().child("storyCounter");
  storyCounterRef.once("value", function(counterSnapshot) {
    var storyCounter = counterSnapshot.val();
    console.log(storyCounter);
    var numberOfStories = storyCounter - 10;
    console.log(numberOfStories)
    var storiesRef = dataRef.ref().child("stories");
    storiesRef.once("value", function(storiesSnapshot) {
      var storiesObj = storiesSnapshot.val();
      for (var i = numberOfStories; i <= storyCounter; i += 1) {
        var loopStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(i);
        loopStoryID.once("value", function(storyWithId) {
          var storiesWithLoopStoryId = storyWithId.val();
          var storyKey = Object.keys(storiesWithLoopStoryId)[0];
          console.log(storyKey)
          var story = storiesWithLoopStoryId[storyKey];
          console.log(story.title);
          var newButt = $("<button>", {
                text: story.title +": "+story.storyPrompt,
                click: function() {
                  var storyId = $(this).attr("data-story-id");
                  storyIndex = storyId;
                  console.log(storyId);
                  console.log(story)
                  storyPath = story;
                  $(".prompt-Lib").empty();
                  $(".mainContain").show();
                  $(".landingPage").hide();
                  $(".joinStory").hide();
                  lexical(".adLib-input");
                  // Show main container -done-
                  // Populate it with the last ad lib -done-
                  console.log(story.adLibArray[1])
                  if(story.adLibArray[1]){
                    var lastSentence = story.adLibArray.length - 1;
                    $(".prompt-Lib").append(story.adLibArray[lastSentence]);
                  }
                  else{$(".prompt-Lib").append(story.storyPrompt)};
                  // Set global story key to story Id -Done-

                }
              });
          newButt.attr("data-story-id", storyKey);
          $(".editStoryDiv").append(newButt)
        });
      }
    });
  });
});





$(".readStoryButt").click(function(){
  
  $(".prompt-Lib").empty();
  $(".prompt-Lib").append(storyPath.storyPrompt+" "+storyPath.adLibArray.join(''))
})


