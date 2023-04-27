# Product Listing

## api
```
/products
```
    query parameters
    - page: number > 0, default: 1
    - limit: number > 0, default: 10

    ex: 
        /products?page=2
        /products?limit=20&page=5

## Configuration
.env file contain configuration of the project if not changed server port will be 3000

## Start Project
```bash
    npm install # Install dependencies
    docker compose up -d # Run redis and postgresql
    npm run db:migrate:latest # Run migrations
    npm run db:seed # Seed database

    # to run server
    npm run dev
    # or 
    npm run build
    npm run start
```


## Tests
```bash
    npm run test
```
