# The Office Quotes API

because the office is epic

## Production host

- [https://the-office-quotes.herokuapp.com/quotes/random](https://the-office-quotes.herokuapp.com/quotes/random)

## APIs

### `GET /quotes/random`

Returns an JSON object with one random quote:

```json
{
    "quote": "Dwight, you ignorant slut!",
    "author": "Micheal Scott"
}
```

### `GET /quotes/{number}`

Returns an array with `{number}` quotes e.g. `GET /quotes/2`

- [https://the-office-quotes.herokuapp.com/quotes/2](https://the-office-quotes.herokuapp.com/quotes/2)

```json
[
   {
      "quote": "I live by one rule: No office romances, no way. Very messy, inappropriate…no. But, I live by another rule: Just do it…Nike.",
      "author": "Micheal Scott"
   },
   {
      "quote": "The only problem is whenever I try to make a taco, I get too excited and crush it.",
      "author": "Kevin Malone"
   }
]
```

### `GET /twss`

Returns an JSON object with all `That's what she said` jokes :

- [https://the-office-quotes.herokuapp.com/twss](https://the-office-quotes.herokuapp.com/twss)

```json
[
  {
    "quote": "Michael. I can't believe you came.",
    "type": "That's what she said",
    "author": "Dwight -> Micheal Scott",
  },
  {
    "quote": "Michael, you are making this harder than it has to be.",
    "type": "That's what she said",
    "author": "Gabe -> Micheal Scott",
  },
  {
    "quote":
      "Wow, that is really hard. You really think you can go all day long? Well, you always left me satisfied and smiling, so-",
    "type": "That's what she said",
    "author": "Jim -> Micheal Scott",
  },
  {
    "quote": "You need to get back on top.",
    "type": "That's what she said",
    "author": "Darryl -> Micheal Scott",
  },
];
```

## Contributing

If you want to add some quotes, just add them in `quotes.js` file and do a pull request !

## Credits
Inspired by [Breaking Bad Quotes](https://github.com/shevabam/breaking-bad-quotes)