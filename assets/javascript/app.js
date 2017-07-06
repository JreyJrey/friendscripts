 // hides the main container  
  $(window).on( "load", function(){
    $(".mainContain").hide();
    $(".newStory").hide();
    $(".joinStory").hide();
    $(".readStory").hide();

  })


  // removes landing page stuff and shows main container
  $("#kickassbtn").on("click", function(event){
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
    var storyIndex = 0;
    var randomWordLength = "";
    var maxCharCount = 150;

    // Capture Button Click
    $(".commit-Lib").on("click", function(event) {
      event.preventDefault();
      $(".prompt-Lib").empty();
      
      //Get the User Input and Trim the spaces.
      adLib = $(".adLib-input").val().trim();
      console.log($(".adLib-input").val().trim())
      adLibArray.push(adLib);
      
      
      // Code to push the data to 
      var storiesRef = dataRef.ref().child("stories");
      storiesRef.once("value", function(snapshot) {
        var stories = snapshot.val();
        var currenStory = stories[storyIndex];
        // if(storyIndex = "newStory"){
        //   storyIndex = Object.keys(storiesRef).length+1
        //   console.log(storyIndex)
          // }

        // else if(currenStory){
          var storySentences = currenStory.adLibArray;
          storySentences.push(adLib);

          storiesRef.child(storyIndex).set({
            id: storyIndex,
            name: name,
            email: email,
            age: age,
            adLibArray: storySentences,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });

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
          // $('.lexical').off('click');
          $('#insufficientChar').text("Not Enough Characters Remaining For The Button You Just Clicked");
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
      console.log($(".adLib-input2").val().trim())
      adLibArray.push(adLib);

// Creates New Story Object in Firebase with a story ID.
      storiesRef.once("value", function(snapshot) {
        var storyCounter = snapshot.val();
        storyCounter++;
        var newStoryID = dataRef.ref().child('stories').orderByChild('id').equalTo(storyCounter);
        console.log(storyCounter);
        console.log("newStoryID: "+newStoryID);
        storiesRef.set(storyCounter);
        console.log(dataRef.ref().child("stories"));

        dataRef.ref().child("stories").push({
          id: storyCounter,
          title: "",
          author: "",
          storyPrompt: "",
          adLibArray: [],
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Click Event for Submit Story
        $(".commitNewStory").click(function(event){
          newStoryID.on("value", function(snapshot) {
            var storiesRef = dataRef.ref().child("stories");
            storiesRef.once("value", function(snapshot) {
              var stories = snapshot.val();
              var currenStory = stories[storyIndex];
        // if(storyIndex = "newStory"){
        //   storyIndex = Object.keys(storiesRef).length+1
        //   console.log(storyIndex)
          // }

        // else if(currenStory){
          var storySentences = currenStory.adLibArray;
          storySentences.push(adLib);
//This is where JOrdan Needs to find out how to look up object by Child(ID) in Firebase

// Maybe limit queries like this will work?
// curl 'https://console.firebase.google.com/project/friendscripts/database/data/stories.json?orderBy="id"&equalTo=NewStoryID&print=pretty'
          storiesRef.child(storyCounter).set({
            title: title,
            author: author,
            storyPrompt: "",
            adLibArray: [],
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        });
          });
        });


});
});