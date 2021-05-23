publish.onsubmit = function () {
    var xhr = new XMLHttpRequest ();
    xhr.open("POST", "/publish", true);
    //xhr.send (JSON.stringify({message:this.elements.message.value, name:this.elements.name.value}));
    xhr.send (JSON.stringify({message:this.elements.message.value}));
    this.elements.message.value="";
    return false;
  };

  subscribe();

  function subscribe (){
    var xhr = new XMLHttpRequest ();
    xhr.open("GET", "/subscribe", true);
    console.log ('subscribed');
    xhr.onload = function (){
      console.log ('onload');
      var li=document.createElement ('li');
      li.textContent = this.responseText;
      li.classList = "list-group-item";
      messages.appendChild (li);
      subscribe();
    };
    xhr.onerror = xhr.onabort = function () {
        setTimeout (subscribe, 500);
    };

    xhr.send('');
    };
