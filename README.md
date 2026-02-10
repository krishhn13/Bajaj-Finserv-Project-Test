# Bajaj Finserv Qualifier 1 - Assessment Service

A robust REST API service developed for the Bajaj Finserv Qualifier 1 assessment at Chitkara University. This production-ready system implements complex mathematical logic mapping and integrates external AI capabilities (Google Gemini) to process diverse data payloads.

##  Live API Endpoints
* **Base URL:** `https://bajaj-finserv-project-test.onrender.com`
* **Health Check:** `GET /health` 
* **Data Processing:** `POST /bfhl`

---

##  Features & Logic Mapping
[cite_start]The service handles exactly one functional key per request to perform specific operations[cite: 31, 32]:

| Key | Input Type | Output Description |
| :--- | :--- | :--- |
| `fibonacci` | Integer | Generates the Fibonacci series up to the specified length |
| `prime` | Integer Array | Filters and returns only the prime numbers from the array. |
| `lcm` | Integer Array | [cite_start]Calculates the Least Common Multiple of the provided integers. |
| `hcf` | Integer Array | [cite_start]Calculates the Highest Common Factor of the provided integers. |
| `AI` | String | Returns a single-word response from an integrated AI model. |

---

##  API Reference

### 1. Health Status
**Endpoint:** `GET /health` 

**Successful Response:**
```json []
{
  "is_success": true,
  "official_email": "YOUR_CHITKARA_EMAIL"
}
```
### 2. BFHL Status
**Endpoint:** : `POST /bfhl`

**Successful Response:**


```json[]
{
    "is_success": true,
    "official_email": "krishan0467.be23@chitkara.edu.in",
    "data": [
        0,
        1,
        1,
        2,
        3
    ]
}
```
