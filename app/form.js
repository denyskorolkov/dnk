"use strict";


function getData (formName) {
  var object = {};
  var form = document.forms[formName].elements;

  for (var index = 0; index < form.length; index++) {
    var length, _form;
    var {name, value, type, dataset, checked, formTarget} = form[index];

    if (!name) continue;

    // set default property type: array or undefined
    _form = form[name]
    length = _form.length;

    if (_.get(object, name) === undefined && length){
      switch (type) {
        case 'radio':
        case 'select':
        case 'select-one':
          break;
        case 'checkbox':
          if (length !== 2 || _form[0].type !== 'hidden') {
            _.set(object, name, []);
          }
          break;
        default:
          if (length > 1) {
            _.set(object, name, []);
          }
      }
    }

    // skip not usable input
    switch (type) {
      case 'checkbox':
      case 'radio':
        if (!checked) continue;
    }
    //
    // // set value for specific input type
    // switch (type) {
    //   case 'hidden':
    //     value = formTarget ? getData(formTarget) : value;
    //     break;
    //   case 'number':
    //     value = +value;
    //     break;
    // }

    // set value for specific input value
    switch (type) {
      case 'hidden':
        value = formTarget ? getData(formTarget) : value;
        break;
      case 'text':
      case 'textarea':
        break;
      case 'number':
        value = +value;
        break;
      default:
        switch (value) {
          case 'true':
            value = true;
            break;
          case 'false':
            value = false;
            break;
          case 'null':
            value = null;
            break;
          default:
            if (/^\d+$/.test(value)) {
              value = +value;
            }
        }
    }

    if (_.get(object, name) instanceof Array) {
      _.get(object, name).push(value);
    } else {
      _.set(object, name, value);
    }
  }
  return object;
}

export default {getData}
