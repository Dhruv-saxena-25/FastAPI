# Fast API: 
- FastAPI is a high-performance, modern web framework for building APIs with Python, based on standard Python type hints. 

- **The key features are:**

    - **Fast:** Very high performance, on par with NodeJS and Go (thanks to Starlette and Pydantic). One of the fastest Python frameworks available.
    - **Fast to code:** Increase the speed to develop features by about 200% to 300%. *
    - **Fewer bugs:** Reduce about 40% of human (developer) induced errors. *
    - **Intuitive:** Great editor support. Completion everywhere. Less time debugging.
    - **Easy:** Designed to be easy to use and learn. Less time reading docs.
    - **Short:** Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.
    - **Robust:** Get production-ready code. With automatic interactive documentation.

# Wokring of Fast API:

![Alt text](fastapi-1.png "fastapi wokring")

1) **Web Server**
- **Purpose:** Acts as the first point of contact for incoming HTTP requests.

- **Functionality:** Receives client requests (like a browser or another server making an API call) and forwards them to the ASGI application.

- **Example:** Popular web servers include Nginx, Apache, or Caddy. In Python, this is often handled by Uvicorn or Hypercorn for ASGI applications.

```bash
POST /predict HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 45

{
    "feature1": 5.2,
    "feature2": 3.1
}
```
- **Role in FastAPI:** The web server listens on a port (e.g., 8000) and routes incoming HTTP requests to the ASGI layer.

2) **ASGI (Asynchronous Server Gateway Interface)**

- **Purpose:** Bridges the web server and the application code, handling the lifecycle of each request.

- **Why ASGI:** It is the asynchronous evolution of WSGI (Web Server Gateway Interface), designed to handle long-lived connections like WebSockets alongside regular HTTP traffic.

- **Flow (from above image):**

    * Receives the incoming HTTP request.

    * Converts it into a structured format that the FastAPI application can understand.

    * Passes it to the API code for processing.

    * Collects the response and sends it back to the web server for final delivery to the client.

    * **Benefits:** Non-blocking, scalable, and allows background tasks and real-time functionality.

3) **API Code (FastAPI)**

- **Purpose:** Contains the actual logic for processing incoming requests and returning appropriate responses.

- **Key Features:**

    * **Request Parsing:** Extracts JSON data into a Pydantic model (Features).

    * **Processing:** Runs the machine learning model or business logic.

    * **Response:** Returns a JSON response to the client.

- **Response (from above image):**

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
    "prediction": 8.3
}
```

#### End-to-End Flow in the Image:

- **Client Request:** A client sends a POST request to /predict with JSON payload.

- **ASGI Processing:** ASGI server (like Uvicorn) accepts the request and passes it to the FastAPI application.

- **API Logic:** FastAPI processes the data, runs the prediction, and generates a response.

- **Response Delivery:** The ASGI server sends the response back to the client.



# Fast API vs. Flask

![Alt text](fasiapi-2.png "fastapi wokring")

# **Path Parameters**

- Path parameters are part of the URL path itself. They are used to capture dynamic values from the URL and pass them to your API function.

```bash
/items/{item_id}
```

- **Purpose:** Capture parts of the URL as variables.
- **Data Type:** You can enforce the data type (e.g., int, str, float) by specifying it in the function signature.
- **Required:** Always required as they are part of the URL.

# **Query Parameters**
- Query parameters are the key-value pairs in the URL, typically found after the ? in the URL. They are used for optional data, filtering, or additional parameters.

```bash
/items?name=book&price=20
```

- **Purpose:** Add optional parameters to your API without changing the URL structure.
- **Data Type:** Can also have type hints like strings, integers, booleans, lists, etc.
- **Optional:** Typically optional, and you can define default values.