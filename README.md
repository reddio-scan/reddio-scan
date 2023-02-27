# reddio-scan

This repo aims to provide a simple block explorer for the reddio ecosystem.

# Getting started

```bash
# copy the sample file and enter alchemy key
cp .env.example .env.local
# install dependencies
yarn
# start the development server
yarn dev
# run tests
yarn test
# formatting code
yarn format
yarn lint:fix
# build for production
yarn build
```

# Resources
## API Documentation
https://docs.reddio.com/guide/introduction/overview.html

## Core APIs
- get all collections<br/>
https://api-dev.reddio.com/v1/collections
- get all transactions for a sequence id<br/>
https://api-dev.reddio.com/v1/txn?sequence_id=305192
- get all records for a stark key<br/>
https://api-dev.reddio.com/v1/records?stark_key=0x6736f7449da3bf44bf0f7bdd6463818e1ef272641d43021e8bca17b32ec2df0&page=1
- get all transactions for a stark key<br/>
https://api-dev.reddio.com/v1/txns?contract_address=0x941661bd1134dc7cc3d107bf006b8631f6e65ad5&sequence_id=305192
- get specific record<br/>
https://api-dev.reddio.com/v1/record?stark_key=0x1c2847406b96310a32c379536374ec034b732633e8675860f20f4141e701ff4&sequence_id=303508
- get transactions for a sequence id<br/>
https://api-dev.reddio.com/v1/txn?sequence_id=303550
