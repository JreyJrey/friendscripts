  // hides the main container
  $(window).on( "load", function(){
    $(".mainContain").toggle();
    $(".newStory").toggle();
    $(".joinStory").toggle();
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
    var storyIndex = 0;

    // Capture Button Click
    $("#commit-Lib").on("click", function(event) {
      event.preventDefault();
      $("#prompt-Lib").empty();
      $(".thumbStyle").val("");
      
      //Get the User Input and Trim the spaces.
      adLib = $("#adLib-input").val().trim();
      console.log($("#adLib-input").val().trim())
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
           $("#prompt-Lib").append(storySentences[lastSentence]);
         }else {
          console.log("length of array", adLibArray.length);
        };

        

      });
      //Clear out the user Input Text Field
      $("#adLib-input").val("");
      $("#prompt-Lib").empty();
      $(".thumbStyle").empty();
    });



    $(".lexical").click(function(){
      var currentText = $("#adLib-input").val();
      $("#adLib-input").empty();
      var lexical = $(this).attr("lexicalCategory");
      var queryURL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech="+lexical+"&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
      $.ajax({
        type: "GET",
        url: queryURL,
        data: config,
        success: function(data) {console.log(data);},
        error: function(response) {console.log(response);}
      })
      .done(function(data) {

        $("#adLib-input").val(currentText + data.word+" ")
        var randomWord = data.word;
        $.ajax({
          type: "GET",
          url: "http://api.wordnik.com:80/v4/word.json/"+randomWord+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          data: config,
          success: function(data) {console.log(data[0].text);}
        })
        .done(function(data) {
          $(".thumbStyle").append(randomWord+": "+data[0].text+"<br>")
        });
      });
    });

// New Story On Click Function
    $(".newStoryButt").click(function(){
      $(".newStory").toggle();
      $(".landingPage").remove();
      $(".mainContain").remove();
      $(".joinStory").remove();


      var storiesRef = dataRef.ref().child("storyCounter");

      var title = $("#titleUserInput");
      var author = $("#authorUserInput");
      var age = $("#ageUserInput");

      storiesRef.once("value", function(snapshot) {
        var storyCounter = snapshot.val();
        storyCounter++;
        var newStoryID = dataRef.ref().child('stories').orderByChild('id').equalTo(storyCounter);
        console.log(storyCounter);
        storiesRef.set(storyCounter);
        console.log(dataRef.ref().child("stories"));

        dataRef.ref().child("stories").push({
          id: storyCounter,
          title: "",
          author: "",
          age: "age",
          storyPrompt: "",
          adLibArray: [],
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
        newStoryID.on("value", function(snapshot) {
          console.log(snapshot.val());
        });

        $("#commitNewStory").click(function(){
          event.preventDefault();
          var newStoryInput = $("#newStory-input").val()
          newStoryID.set({
            title: title,
            author: author,
            storyPrompt: newStoryInput,
            email: email,
            age: age,
            adLibArray: [],
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        });
// Join Story Button Function
$(".joinStory").click(function(){
      $(".joinStory").toggle();
      $(".landingPage").remove();
      $(".mainContain").remove();
      $(".newStoryButt").remove();
});

});
});