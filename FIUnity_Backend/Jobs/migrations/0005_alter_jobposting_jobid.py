# Generated by Django 5.0.6 on 2024-08-09 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0004_alter_jobposting_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobposting',
            name='jobID',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
