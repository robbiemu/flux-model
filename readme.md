
## basic concept
[preview](https://robbiemu.github.io/flux-model/basic/view.html)

* app.css — just layout
* docready.js — a generic `$(function(){/*ready*/})` sort of loader

* view.html — the presentation
* app.js — the application

## mvc implementation
this implementation uses an mvc architecture

[preview](https://robbiemu.github.io/flux-model/mvc/view.html)

* controllerLeft — one controller for the 'left' data
* controllerRight — another controller for the 'right' data

These two are separated to represent different projects within this app. One project is responsible for one set of data, another for new data. 

Flux doesn't solve a problem you can't solve with MVC/MVVM, instead it _eases_ production-readying of code by providing a pattern developers can use to avoid dangling internal inconsistencies. 

One could imagine a bug in "right" after left was already built, which might only show up some of the time, and in "left's" view: for example, what if right didn't update `isPrime` in left? From the perspective of right, the code works and is ready to push to production. If someon noticing the bug tests left by looking at the effects of the view methods there, it doesn't matter what you set right to first, left's `isPrime` will be accurate once you use left's methods. So the problem is hard to locate. This is ultimately not too hard to track down, but here we are ony using two variables and essentially only 2 states.

## flux
this implementation uses a model of the flux architecture

[preview](https://robbiemu.github.io/flux-model/flux/view.html)

* *.action.js — defines actions independently so they can be reused in other action chains without referring back to the view. Actions evoke the Dispatcher to give every listening Store a chance to react to them.
* *.view.js — defines presentation data and attaches interaction back to the model (by launching actions)
* dispatcher.js — the dipatcher is rather like an eventemitter. In this case we keep a transaction log that could in theory be used to revert application state.
* store.js — keeps the presentation logic and modelled data for presentation.

both store.js and the vews register store listeners.

By way extension to the MVC example, we can imagine the same bug in "Right" now. Here the prime check is a consequent action chained from the update actions. The data is stored in a central repository and it would appear broken to both sides if it were broken to either. You can still make the same mistakes you're just more likely to notice it.

## Addendum

Just because MVC is flexible enough to make it hard to debug doesn't mean you can't conform to a similar solution anyway — Facebook themselves have gone out of their way to refrain from calling Flux a framework and instead call it an architectural pattern.

Likewise Flux gives you extra guidance in building maintainable apps, but people are naturally creative; you can still engineer transient bugs of you fail to use the pattern towards its best provisions.

IMO, the basic idea provided is great: use something ike events to creat unidirectional information flow.