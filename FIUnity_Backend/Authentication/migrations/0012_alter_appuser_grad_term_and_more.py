# Generated by Django 5.0.6 on 2024-07-12 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication', '0011_alter_appuser_grad_term_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='grad_term',
            field=models.CharField(choices=[('Spring', 'Spring'), ('Summer', 'Summer'), ('Fall', 'Fall')], max_length=10),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='graduation_year',
            field=models.IntegerField(default=2024),
        ),
    ]
