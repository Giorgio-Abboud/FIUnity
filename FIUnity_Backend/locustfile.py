from locust import HttpUser, between, task
import json
import random
import string

class LoadTestUser(HttpUser):
    host = "http://127.0.0.1:8000/"
    wait_time = between(1, 5)

    @task
    def register(self):
        # Generate random data for a new user
        email = ''.join(random.choices(string.ascii_lowercase, k=10)) + "@example.com"
        first_name = ''.join(random.choices(string.ascii_lowercase, k=5))
        last_name = ''.join(random.choices(string.ascii_lowercase, k=5))
        PID = ''.join(random.choices(string.digits, k=7))
        password = "password123"
        graduation_year = random.choice([2020, 2021, 2022, 2023, 2024])
        grad_term = random.choice(['Spring', 'Summer', 'Fall'])
        status = "Student"

        # Prepare the JSON payload
        payload = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "PID": PID,
            "password": password,
            "graduation_year": graduation_year,
            "grad_term": grad_term,
            "status": status
        }

        # Send the POST request to register a new user
        self.client.post("/authentication/register/", json=payload)
