# Generated by Django 5.0.6 on 2024-08-21 02:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Feed', '0018_post_repost_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='repost_count',
        ),
        
    ]
