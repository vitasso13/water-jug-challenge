# Water Jug Challenge API

This repository contains the implementation of the Water Jug Challenge as an API. The API is designed to solve the classic water jug problem, where you have two jugs with different capacities and you need to measure out a specific amount of water.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= 18.x
- npm

### Dependencies
- dotenv": "^16.4.5",
- express": "^4.19.2",
- node-cache": "^5.1.2"

### Installation

1. Clone the repository
```bash
git clone https://github.com/vitasso13/water-jug-challenge.git
```
2. Navigate to the project directory
```bash
cd water-jug-challenge
```
3. Install dependencies
```bash
npm install
```
4. Build the application
```bash
npm run build
```
5. Start the server
```bash
npm start
```

## Usage

The API endpoint is `/jug` and it accepts POST requests. The request body should contain the following parameters:

- `x_capacity`: The capacity of the first jug.
- `y_capacity`: The capacity of the second jug.
- `z_amount_wanted`: The amount of water you want to measure.

#### Requests will be cached for future repetitions using `NodeCache`

Example request:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"x_capacity": 2, "y_capacity": 10, "z_amount_wanted": 4}' http://localhost:3000/jug
```
`POST` payload
```json
{
    "x_capacity": 2,
    "y_capacity": 10,
    "z_amount_wanted": 4
}
```
Example response `200 OK`: 
```json
{
    "solution": [
        {
            "step": 1,
            "bucketX": 2,
            "bucketY": 0,
            "action": "Fill bucket X"
        },
        {
            "step": 2,
            "bucketX": 0,
            "bucketY": 2,
            "action": "Transfer from bucket X to Y"
        },
        {
            "step": 3,
            "bucketX": 2,
            "bucketY": 2,
            "action": "Fill bucket X"
        },
        {
            "step": 4,
            "bucketX": 0,
            "bucketY": 4,
            "action": "Transfer from bucket X to Y",
            "status": "Solved"
        }
    ]
}


```
Error Responses: \
`400 Bad Request` for invalid input
```json
{
    "error":"All parameters must be positive integers."
}
```
`404 Not Found` for impossible solutions
```json
{
    "solution": "No solution possible"
}
```
The api also have a health check `GET` on `/`
If the service is running, it must return: 
```bash
"Health Checked. Server is running fine. Cheers! ;)"
```
## Running the tests

To run the tests, use the following command:

```bash
npm test
```

## Project Structure
```folder
src
├── mapping
│   └── *All dataclasses and type mappers. 
├── middlewares 
│   └── *Middleware files of the api. 
├── routes 
│   └── *Router files of the api. 
├── services 
│   └── *Contain all the algorithm logic files 
├── utils 
│   └── *Util methods that might be used repeatedly across the project. 
└── app.ts * Contain the expressJS and routers
└── index.ts * Initial point of the application.
__test__
├── integration
│   └── *All integration tests
├── unit
│   └── *All unit tests
```