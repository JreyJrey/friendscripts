 // hides the main container  
 $(window).on( "load", function(){
  $(".editStory").hide();
  $(".newStory").hide();
  $(".joinStory").hide();
  $(".readStory").hide();
  $(".readStoryBttnPage").hide();
})


  // removes landing page stuff and shows main container
  $("#editStoryButt").on("click", function(event){
    $(".editStory").show();
    $(".landingPage").hide();
    $(".joinStory").hide();
    lexical(".adLib-input2");
  })

  // New Story On Click Function
  $(".newStoryButt").click(function(event){
    $(".newStory").show();
    $(".landingPage").hide();
    $(".editStory").hide();
    $(".joinStory").hide();
    $(".readStory").hide();
    $(".readStoryBttnPage").hide();
  })

    $(".prompt-Lib").readRemaining();

  // Join Story Button Function
  $(".joinStoryButt").click(function(event){
    $(".joinStory").show();
    $(".landingPage").hide();
    $(".editStory").hide();
    $(".newStory").hide();
    $(".readStory").hide();
    $(".hoverStyle").hide();
    $(".readStoryBttnPage").hide();
  });

 // Read Story Button Function
 $(".readStoryButt").click(function(event){
  $(".readStory").show();
  $(".landingPage").hide();
  $(".editStory").hide();
  $(".newStory").hide();
  $(".joinStory").hide();
  $(".hoverStyle").hide()
  $(".readStoryBttnPage").hide();
  $(".prompt-Lib").empty();
  $(".prompt-Lib").append(storyPath.storyPrompt+" "+storyPath.adLibArray.join(' '))
//   console.log(id);
//   var storyCounterRef = dataRef.ref().child("storyCounter");
//   storyCounterRef.once("value", function(counterSnapshot) {
//     var storyCounter = counterSnapshot.val();
//     console.log(storyCounter);
//     var storiesRef = dataRef.ref().child("stories");
//     storiesRef.once("value", function(storiesSnapshot) {
//       var storiesObj = storiesSnapshot.val();
//       var loopStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(id);
//       console.log(loopStoryID);
//         loopStoryID.once("value", function(storyWithId) {
//           var storiesWithLoopStoryId = storyWithId.val();
//           console.log(storiesWithLoopStoryId);
//           var storyKey = Object.keys(storiesWithLoopStoryId)[0];
//           console.log(storyKey)
//           var story = storiesWithLoopStoryId[storyKey];
//           var newButt = $("<button>", {
//                 text: story.title +": "+story.storyPrompt,
//                 click: function() {
//                   var storyId = $(this).attr("data-story-id");
//                   storyIndex = storyId;
//                   storyPath = story;
//                   // console.log(storyId);
//                   // console.log(storyId);
//                   // console.log(story)
//                   // console.log(storyPath);
//                   $(".prompt-Lib").empty();
//                   $(".landingPage").hide();
//                   $(".joinStory").hide();
//                   $("#editStoryCommit").val("");
//                   $(".editStory").show();
//                   $(".thumbStyle").empty();
//                   // console.log(story.adLibArray[1])
//                   if(story.adLibArray[1]){
//                     var lastSentence = story.adLibArray.length - 1;
//                     $(".prompt-Lib").append(story.adLibArray[lastSentence]);
//                   }
//                   else{$(".prompt-Lib").append(story.storyPrompt)};
//                 }
//               });
//   newButt.attr("data-story-id", storyKey);
//   $("#readButtDiv").empty();
//   $("#readButtDiv").append(newButt);
// });
// });
// });
}); 

//Buttons to Read Stories
 $(".readStoryMainButt").click(function(event){
  $(".readStoryBttnPage").show();
  $(".readStory").hide();
  $(".landingPage").hide();
  $(".editStory").hide();
  $(".newStory").hide();
  $(".hoverStyle").hide()
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
    var id;

     // Capture Button Click
    $(".commit-Lib").on("click", function(event) {
      event.preventDefault();
      $(".prompt-Lib").empty();
      
      //Get the User Input and Trim the spaces.
      adLib = $("#editStoryCommit").val().trim();
      // console.log($("#editStoryCommit").val().trim())

      //Highlight Text Field
      if(adLib.length === 0){
            $("#editStoryCommit").attr("style", "border-color: red; border-width: 6px")
            setTimeout(function(){
              $('#editStoryCommit').attr("style", "");}, 2000);
      }
      else{
      
      // Code to push the data to 
      var storiesRef = dataRef.ref().child("stories");
      storiesRef.once("value", function(snapshot) {
        var stories = snapshot.val();
        // console.log(stories);
        var currenStory = stories[storyIndex];
        console.log(currenStory)
          var storySentences = currenStory["adLibArray"];
          var storyPrompt = currenStory["storyPrompt"]
          console.log(adLib);
          storySentences.push(adLib);
          console.log(storySentences);
          console.log(storyIndex);

          //Set the adLibArray in Firebase
          storiesRef.child(storyIndex+"/adLibArray").set(storySentences);
          console.log(storiesRef.child(storyIndex+"/adLibArray"))
          if (storySentences.length > 0){
           var lastSentence = storySentences.length-1;
           $(".prompt-Lib").append(storySentences[lastSentence]);
         }else {
          // console.log("length of array", adLibArray.length);
        };

        

      });
      //Clear out the user Input Text Field
      $("#editStoryCommit").val("");
      $(".prompt-Lib").empty();
      $(".thumbStyle").empty();
      $(".charCount").text("Characters Remaining: 150")

      }
  });

  // Mark turned "lexical" into a function so we can easily call it and pass in different classes of adLib-input
  
    $(".lexicalEdit").click(function(){
      event.preventDefault();
      var currentText = $("#editStoryCommit").val();
      // console.log(currentText);
      // $("#editStoryCommit").empty();
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
        var length = $("#editStoryCommit").val().length;

        var charRemain = maxCharCount - length - randomWordLength;

        if (charRemain >= randomWordLength) {
          $("#editStoryCommit").val(currentText + data.word+" ");
          $(".charCount").text("Characters Remaining: " + charRemain);
        } else if(charRemain <= 0){
          charRemain = 0;
          $(".charCount").text("Characters Remaining: " + charRemain);
        }
        
        $.ajax({
          type: "GET",
          url: "https://api.wordnik.com/v4/word.json/"+randomWord+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          data: config,
          success: function(data) {console.log(data[0].text);}
        })
        .done(function(data) {
          $(".thumbStyle").prepend(randomWord+": "+data[0].text+"<br>");
          //Keep Definitions textarea scrolled to the bottom
          $(".thumbStyle").each(function() {this.scrollTop = 0;})
        });
      });
    });

//Lexical Buttons for New Story
$(".lexicalNew").click(function(){
      event.preventDefault();
      var currentText = $("#newStoryText").val();
      // console.log(currentText);
      // $("#newStoryText").empty();
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
        var length = $("#newStoryText").val().length;

        var charRemain = maxCharCount - length - randomWordLength;

        if (charRemain >= randomWordLength) {
          $("#newStoryText").val(currentText + data.word+" ");
          $(".charCount").text("Characters Remaining: " + charRemain);
        } else if(charRemain <= 0){
          charRemain = 0;
          $(".charCount").text("Characters Remaining: " + charRemain);
        }
        
        $.ajax({
          type: "GET",
          url: "https://api.wordnik.com/v4/word.json/"+randomWord+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          data: config,
          success: function(data) {console.log(data[0].text);}
        })
        .done(function(data) {
          $(".thumbStyle").prepend(randomWord+": "+data[0].text+"<br>");
          //Keep Definitions textarea scrolled to the bottom
          $(".thumbStyle").each(function() {this.scrollTop = 0;})
        });
      });
    });


//Edit Story Char Count
  $("#editStoryCommit").keyup(function() {
    var length = $(this).val().length;
    var charRemain = maxCharCount - length;
    if (charRemain >= 0) {
        $(".charCount").text("Characters Remaining: " + charRemain);
    }
  })

//New Story Char Count
$("#newStoryText").keyup(function() {
    var length = $(this).val().length;
    var charRemain = maxCharCount - length;
    if (charRemain >= 0) {
        $(".charCount").text("Characters Remaining: " + charRemain);
    }
  })


// New Story On Click Function
$(".newStoryButt").click(function(event){
  $("#newStoryText").val("");
  $(".userAuthor").val("");
  $(".userTitle").val("");
  $(".newStory").show();
  $(".landingPage").hide();
  $(".hoverStyle").hide();
  $(".editStory").hide();
  $(".joinStory").hide();
  $(".readStory").hide();

// Variables
var storiesRef = dataRef.ref().child("storyCounter");
var title = $(".titleUserInput");
var author = $(".authorUserInput");
adLib = $("#newStoryText").val().trim();
      // console.log($(".adLib-input2").val().trim())
      adLibArray.push(adLib);

// Creates New Story Object in Firebase with a story ID.
    storiesRef.once("value", function(snapshot) {
      var storyCounter = snapshot.val();
      storyCounter++;
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
          var userAuthor = $(".userAuthor").val();
          var adLib2 = $("#newStoryText").val();
          var newStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(storyCounter);

          //Validate User Input
          if(userTitle === ""){
            $(".userTitle").attr("style", "border-color: red; border-width: 6px")
            setTimeout(function(){
              $(".userTitle").attr("style", "");}, 2000);}
            else if(userAuthor === ""){
              $(".userAuthor").attr("style", "border-color: red; border-width: 6px")
              setTimeout(function(){
              $(".userAuthor").attr("style", "");}, 2000);}
            else if(adLib2 === ""){
              $("#newStoryText").attr("style", "border-color: red; border-width: 6px")
              setTimeout(function(){
              $("#newStoryText").attr("style", "");}, 2000);}
            else{

            //Get Story ID and commit the Title, Author and Prompt
              newStoryID.on("value", function(snapshot) {
                var firebaseID = Object.keys(snapshot.val())[0];
                firebaseID = firebaseID.toString();
                // console.log(firebaseID);
                var story = dataRef.ref().child("stories").child(firebaseID)
                story.update({
                  title: userTitle,
                  author: userAuthor,
                  storyPrompt: adLib2,
                  adLibArray: [""]

                });

              //Go to the edit page of the Story Just submitted
          var loopStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(storyCounter);
          loopStoryID.once("value", function(storyWithId) {
          var storiesWithLoopStoryId = storyWithId.val();
          var storyKey = Object.keys(storiesWithLoopStoryId)[0];
          // console.log(storyKey)
          var story = storiesWithLoopStoryId[storyKey];
          // console.log(story.title);
              
                  storyIndex = firebaseID;
                  storyPath = story;
                  // console.log(storyId);
                  // console.log(story)
                  // console.log(storyPath);
                  $(".newStory").hide();
                  $(".prompt-Lib").empty();
                  $(".landingPage").hide();
                  $(".joinStory").hide();
                  $("#editStoryCommit").val("");
                  $(".thumbStyle").empty();
                  $(".charCount").text("Characters Remaining: 150");
                  $(".editStory").show();
                  // console.log(story.adLibArray[1])
                  if(story.adLibArray[1]){
                    var lastSentence = story.adLibArray.length - 1;
                    $(".prompt-Lib").append(story.adLibArray[lastSentence]);
                  }
                  else{$(".prompt-Lib").append(story.storyPrompt)};
                });
             });
              };
            });
        });
    });

// });

//Join Story Dynamically produce Story Buttons
$(".joinStoryButt").click(function(){
  $(".editStoryDiv").empty();
  $("#editStoryCommit").val("");
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
          // console.log(storyKey)
          var story = storiesWithLoopStoryId[storyKey];
          // console.log(story.title);
          var newButt = $("<button>", {
                text: story.title +": "+story.storyPrompt,
                click: function() {
                  var storyId = $(this).attr("data-story-id");
                  storyIndex = storyId;
                  storyPath = story;
                  id = i;
                  // console.log(storyId);
                  // console.log(storyId);
                  // console.log(story)
                  // console.log(storyPath);
                  $(".prompt-Lib").empty();
                  $(".landingPage").hide();
                  $(".joinStory").hide();
                  $("#editStoryCommit").val("");
                  $(".editStory").show();
                  $(".thumbStyle").empty();
                  // console.log(story.adLibArray[1])
                  if(story.adLibArray[1]){
                    var lastSentence = story.adLibArray.length - 1;
                    $(".prompt-Lib").append(story.adLibArray[lastSentence]);
                  }
                  else{$(".prompt-Lib").append(story.storyPrompt)};
                }
              });
          newButt.attr("data-story-id", storyKey);
          $(".editStoryDiv").append(newButt);
        });
      }
    });
  });
});


$(".readStoryMainButt").click(function(){
  $("#readStoryDiv").empty();
  $("#editStoryCommit").val("");
  var storyCounterRef = dataRef.ref().child("storyCounter");
  storyCounterRef.once("value", function(counterSnapshot) {
    var storyCounter = counterSnapshot.val();
    console.log(storyCounter);
    var numberOfStories = 1
    // storyCounter - 10;
    console.log(numberOfStories)
    var storiesRef = dataRef.ref().child("stories");
    storiesRef.once("value", function(storiesSnapshot) {
      var storiesObj = storiesSnapshot.val();
      for (var i = numberOfStories; i <= storyCounter; i += 1) {
        var loopStoryID = dataRef.ref().child("stories").orderByChild('id').equalTo(i);
        loopStoryID.once("value", function(storyWithId) {
          var storiesWithLoopStoryId = storyWithId.val();
          var storyKey = Object.keys(storiesWithLoopStoryId)[0];
          var story = storiesWithLoopStoryId[storyKey];
          var newButt = $("<button>", {
                text: story.title +": "+story.storyPrompt,
                click: function() {
                  var storyId = $(this).attr("data-story-id");
                  storyIndex = storyId;
                  storyPath = story;
                  $(".prompt-Lib").empty();
                  $(".landingPage").hide();
                  $(".joinStory").hide();
                  $("#editStoryCommit").val("");
                  $(".editStory").hide();
                  $(".readStoryBttnPage").hide();
                  $(".readStory").show();
                  $(".prompt-Lib").empty();
                  $(".prompt-Lib").append(storyPath.storyPrompt+" "+storyPath.adLibArray.join(''))
                  $(".title").empty();
                  $(".title").append(storyPath.title);
                }
              });
          newButt.attr("data-story-id", storyKey);
          $("#readStoryDiv").append(newButt);
        });
      }
    });
  });
});





