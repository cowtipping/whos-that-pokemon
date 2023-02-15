
# Who's That Pokemon

Uses the Pokemon API to generate a random Pokemon. Multiple choice answers. Pick the correct Pokemon, win a point. gg ez.


## Demo

[Live Site](https://cowtipping.co.uk/whothatpoke/)


## Motivation

This was a project made early into my bootcamp at [School Of Code](https://www.schoolofcode.com/), using vanilla JavaScript, which we learned in week 1 and using public APIs, which we learned in week 2.

I revisted those topics a few weeks later as a little refresher side-project.

## TypeScript Teachings

This is the first of my old projects I've converted to TS.
- Came across a lot of "is possibly null" errors and added error-checking for those.  
- Had an issue with "property src does not exist on type 'Element'" which was fixed using type assertions (ie. trust me, bro 😎) by adding `as HTMLImageElement` after the offending sprite definition.  
- The same issue also reared its ugly head as it did not like `e.target.value` so I learned I can use `(e.target as HTMLButtonElement).value` instead.  
- There weren't a huge amount of changes other than those as TS was able to infer most of the types.

## Patch Notes
15.Feb.23  
Converted the project to TypeScript.

28.Jan.23  
Moved image and answers to be side-by-side on larger screens.  

19.Dec.22  
Fixed getting duplicate Pokemon in answers.

8.Dec.22  
Added patch notes. 🤣  
Updated visuals for smaller devices. Fixed some jank in the JS.