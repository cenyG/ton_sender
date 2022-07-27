Install all dependencies:
```
npm i
```

** Please update `.env` file and specify `MAIN_NET` param   
*** Seed phrase should be just words separated by spaces without commas

Generate KeyPair from seed:
```
npm run seed-to-key -- -s SEED_PHRASE
```

Send TON using seed:
```
npm run withdraw -- -s SEED_PHRASE --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
```

Send TON using Secret Key:
```
npm run withdraw -- --sk SECRET_KEY --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
```

Also, could be used without npm scripts just like that:
```
node seedToKeyPair.js -s your seed
node sendTon.js -s SEED_PHRASE --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
node sendTon.js -sk SECRET_KEY --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
```