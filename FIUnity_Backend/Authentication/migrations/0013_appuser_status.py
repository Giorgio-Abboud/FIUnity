# Generated by Django 5.0.6 on 2024-08-01 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication', '0012_alter_appuser_grad_term_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='status',
            field=models.CharField(default='', max_length=50),
        ),
    ]
