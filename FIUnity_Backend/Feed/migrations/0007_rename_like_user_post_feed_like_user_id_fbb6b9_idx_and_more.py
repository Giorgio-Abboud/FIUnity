# Generated by Django 5.0.6 on 2024-07-31 18:37

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Feed', '0006_remove_postimage_post_alter_comment_options_and_more'),
    ]

    operations = [
        migrations.RenameIndex(
            model_name='like',
            new_name='Feed_like_user_id_fbb6b9_idx',
            old_fields=('user', 'post'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='like',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
