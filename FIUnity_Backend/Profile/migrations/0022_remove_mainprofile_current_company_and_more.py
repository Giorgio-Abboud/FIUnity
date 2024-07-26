# Generated by Django 5.0.6 on 2024-07-26 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0021_remove_skill_is_standalone_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainprofile',
            name='current_company',
        ),
        migrations.RemoveField(
            model_name='mainprofile',
            name='current_extracurricular',
        ),
        migrations.RemoveField(
            model_name='mainprofile',
            name='current_project',
        ),
        migrations.AddField(
            model_name='profile',
            name='minor',
            field=models.CharField(default='', max_length=50),
        ),
    ]
