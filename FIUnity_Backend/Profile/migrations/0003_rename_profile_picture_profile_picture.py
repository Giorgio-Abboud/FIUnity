# Generated by Django 5.0.6 on 2024-08-07 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_rename_picture_profile_profile_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='profile_picture',
            new_name='picture',
        ),
    ]
