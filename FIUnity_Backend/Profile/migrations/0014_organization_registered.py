# Generated by Django 5.0.6 on 2024-07-22 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0013_extracurricular_tagline_profile_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='registered',
            field=models.BooleanField(default=False),
        ),
    ]
