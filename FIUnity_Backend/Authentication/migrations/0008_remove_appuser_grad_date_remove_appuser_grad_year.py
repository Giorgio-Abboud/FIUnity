# Generated by Django 5.0.6 on 2024-07-11 22:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication', '0007_appuser_grad_date_appuser_grad_year'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appuser',
            name='grad_date',
        ),
        migrations.RemoveField(
            model_name='appuser',
            name='grad_year',
        ),
    ]
