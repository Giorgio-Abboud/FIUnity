# Generated by Django 5.0.6 on 2024-08-03 22:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Feed', '0009_merge_20240803_1841'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commentlike',
            options={},
        ),
        migrations.RemoveField(
            model_name='commentlike',
            name='date',
        ),
    ]
