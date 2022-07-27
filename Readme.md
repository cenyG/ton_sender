Install all dependencies:
```
npm i
```

** Please update `.env` file and specify `MAIN_NET` param

Generate KeyPair from seed:
```
npm run seed-to-key -- -s your seed just like that
```

Send TON using seed:
```
npm run withdraw -- -s your seed --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
```

Send TON using Secret Key:
```
npm run withdraw -- -sk 123abc --amount 0.1 --to EQAfi_IcjRyIwFG6fbg89_t8PhnaGSM0sO1pg1LRJaIONBza
```