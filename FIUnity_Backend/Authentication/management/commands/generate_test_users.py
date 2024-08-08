# Authentication/management/commands/generate_test_users.py
from django.core.management.base import BaseCommand
from Authentication.models import AppUser
from Profile.models import Profile, MainProfile
from faker import Faker
import random
import string

class Command(BaseCommand):
    help = 'Generate test users'

    def handle(self, *args, **kwargs):
        fake = Faker()
        created_count = 0
        for _ in range(10000):  # Adjust the number for desired volume
            while True:
                email = fake.email()
                PID = ''.join(random.choices(string.digits, k=7))  # Generate a unique 7-digit PID

                if not AppUser.objects.filter(email=email).exists() and not AppUser.objects.filter(PID=PID).exists():
                    break  # If both email and PID are unique, exit the loop and create the user

            first_name = fake.first_name()
            last_name = fake.last_name()
            graduation_year = random.randint(2020, 2024)  # Use a realistic range for graduation years
            grad_term = random.choice(['Spring', 'Summer', 'Fall'])

            user = AppUser.objects.create_user(
                email=email,
                first_name=first_name,
                last_name=last_name,
                PID=PID,
                password='password123',
                graduation_year=graduation_year,
                grad_term=grad_term
            )
            Profile.objects.create(
                user=user,
                first_name=first_name,
                last_name=last_name,
                email=email,
                grad_term=grad_term,
                graduation_year=graduation_year,
                status=user.status
            )
            MainProfile.objects.create(profile=user.profile)
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully generated {created_count} test users'))
