# Generated by Django 5.0.6 on 2024-08-06 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0031_profile_company_url_alter_profile_about'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(default='profile_pictures/black_background.jpg', upload_to='profile_pictures/'),
        ),
    ]
