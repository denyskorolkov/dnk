# Use form

``` html
<input
  * name="${name}"
  * form="${form}"
  ? defaultValue="${defaultValue}" default: value
  ? value="${value}"
  ? data-format="${string | boolean | date | ...}"
  ? data-is-changed="${true || false}"
  ? data-prev-value="${prevValue}"
  ? multiple="true"
  typeof value  in ["model", "collection"] ? formtarget="${model | collection}"
>
```

``` javascript
source = {
  number: 1,
  bool: true,
  model: new Backbone.Model({
    number: 12,
    model: new Backbone.Model({
      number: 123
    })
  }),
  obj: {
    str: "str value",
    str2: "str2 value"
  }
};

clone = app.request("@helpers clone", source);

source.model.attributes === clone.model; // false

source.model.attributes.model.attributes === test.model.c2; // false

source = [{prop:3},{prop:22},{prop:55}];

clone = app.request("@helpers clone", source);

clone[0] === source[0]; // false

collection = new Backbone.Collection([
  {number: 1},
  {number: 2}
]);

collection.models[0].attributes === clone[0]; // false


source = {a: 1, obj: {c:2,d:4}, b: 3};
dest = {a: 1, obj: {c:2,d:4}, b: 3};

app.request("@helpers is equal?", source, dest); // true

// Не учитывает сортировку
```
