"use strict";

import _ from "lodash";
import form from "./form";
import template from "./template";

console.log(template.apply({name: 'NAME'}));
debugger
console.log(form);
console.log(form.getData('data'));

window.onload = function(){

  window.addEventListener("scroll", function(e){
    debugger
  });

  document.addEventListener("scroll", function(e){
    debugger
  });

  var x = 0;
  var y = 0;

  document.addEventListener('mousemove', onMouseMove, false)

  function onMouseMove(e){
      x = e.clientX;
      y = e.clientY;
  }

  function getMouseX() {
      return x;
  }

  function getMouseY() {
      return y;
  }

  document.body.addEventListener("scroll", function(e){
    debugger
  });

  // document.getElementById("scroll").addEventListener("scroll", function(e){
  //   debugger
  // }, true);
  document.addEventListener("mouseenter", function(e){

    console.log(e.target);
  }, false);

  window.addEventListener("click", function(e){
    console.log(getMouseX(), getMouseY());
    // window.getSelection().getRangeAt(0)
  }, false);




  // элемент TD, внутри которого сейчас курсор
  var currentElem = null;
  var timeout = null;

  document.onmouseover = function(event) {
    var target = event.target;
    var titleContent;

    var title = target.title ? target : null;

    while (!title) {
      if (target.id === "title") {
        return;
      }
      if (target.title || target.dataset.title) {
        title = target;
      }
      target = target.parentNode;
    }

    if (currentElem === title) {
      return;
    }

    if (currentElem) {
      currentElem.style.border = 'none'; // destroy tooltip
      currentElem.style.cursor = "inherit";
      currentElem.title = currentElem.dataset.title;
      delete currentElem.dataset.title;
      currentElem = null;
      clearTimeout(timeout);
      document.getElementById('title').innerHTML = "";
      document.getElementById('title').style.display = "none";
    }

    if (title && title.style) {
      currentElem = title;
      titleContent = currentElem.dataset.title = currentElem.title;
      currentElem.title = "";
      currentElem.style.border = 'solid green 1px'; // start tooltip
      currentElem.style.cursor = "progress";

      timeout = setTimeout(function(){
        // let mouseEvent = new MouseEvent("click");
        // window.dispatchEvent(mouseEvent);
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var positionX, positionY;
        var title = document.getElementById('title');
        // title.style.width = "";
        // title.style.height = "";
        // title.contentDocument.body.style.padding = '0';
        // title.contentDocument.body.style.margin = '0';
        // title.contentDocument.body.innerHTML = `<div style="background: red;">
        title.innerHTML = `<div style="">
          <b>${titleContent}</b>
        </div>`;

        var w, h;

        // h = title.contentDocument.body.scrollHeight;
        // w = title.contentDocument.body.scrollWidth;

        // title.style.width = w;
        // title.style.height = h;

        var x = getMouseX();
        var y = getMouseY();

        if (x > windowWidth/2) {
          title.style.right = `${windowWidth - x}px`;
          title.style.left = "auto";
        } else {
          title.style.left = `${x}px`;
          title.style.right = "auto";
        }

        if (y > windowHeight/2) {
          title.style.bottom = `${windowHeight - y}px`;
          title.style.top = "auto";
        } else {
          title.style.top = `${y}px`;
          title.style.bottom = "auto";
        }

        title.style.display = "block"

        // таймаут завершен
        if (currentElem) {
          currentElem.style.cursor = "inherit";
        }
      }, 1000);
    }
  };
  // //
  // //
  // document.onmouseout = function(event) {
  //   // если курсор и так снаружи - игнорируем это событие
  //   if (event.relatedTarget === currentElem) {
  //     currentElem.style.border = 'none';
  //     currentElem = null;
  //   }
  //
  // };
  var hash = {};
  (function(){
  // SCHEME
  // model = create({}, ["model"]);
  // model.destroy()

  // model.get("NAME")
  // model.get("ATTRIBUTES.NAME")
  // model.set("ATTRIBUTES.NAME", value)
  // model.NAME model.toLocaleString("NAME") -> __ model.scheme
  // model[Symbol.for('app')] = hash[Symbol.for('app')]
  // model[Symbol.for('hash')] = hash[Symbol.for('hash')]
  // meta.view -> view
  // meta.model -> model
  // model.validation model.validator

  // meta {NAME: {}, NOTE: {}}
  // toLocalsString() -> __ context, NAME, meta[NAME]
  // state "success..." {state: "loading", percent: 100}
  // key
  // message locale key
  // scheme settings for prop {NAME: type: String, ...}
  // validation validator
  // model.isChanged
  // settings? options
  // data ? value ? name ? prop ?
  // model.can === "true"
  // model.can === "false"
  // model.can.getError()

  // model.validate("NAME") -> true false.toJSON()

  // model.disabled

  // ` ${block.row =}`


  var object = {
    NAME: 'name',
    NOTE: 'note'
  };
  var id = _.uniqueId();
  var hashId = Symbol.for(id)
  hash[id] = object;

  Object.defineProperty(object, Symbol.for('id'), {
    value: id
  });

  Object.defineProperty(object, Symbol.for('to destroy'), {
    value: []
  });
  Object.defineProperty(object, "destroy", {
    enumerable: false,
    value: function() {
      let toDestroyElements = this[Symbol.for('to destroy')];
      for (let element of toDestroyElements) {
        delete hash[element];
      }
      delete hash[this[Symbol.for('id')]];
      return true;
    }
  });
  Object.defineProperty(object, "meta", {
    enumerable: false,
    get: function() {
      return hash[this[Symbol.for('meta')]];
    },
    set: function(value) {
      debugger
      if (typeof value === "object") {
        var id = _.uniqueId();
        value.id = id;
        hash[id] = value;
        this[Symbol.for('to destroy')].push(id);
        this[Symbol.for('meta')] = id;
      } else {
        this[Symbol.for('meta')] = value;
      }
    }
  });

  object.meta = {
    state: "success"
  };
  debugger
  object.destroy
  })();

  function mutation() {

    var target = document.body;

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        debugger
      });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, subtree: true, characterData: true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
    observer.disconnect();
  };
}

export default {form: form}
