from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0025_profile_network'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainprofile',
            name='about',
        ),
        migrations.RemoveField(
            model_name='mainprofile',
            name='resume',
        ),
        migrations.AddField(
            model_name='profile',
            name='about',
            field=models.TextField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='profile',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to='resumes/'),
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0025_profile_network'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainprofile',
            name='about',
        ),
        migrations.RemoveField(
            model_name='mainprofile',
            name='resume',
        ),
        migrations.AddField(
            model_name='profile',
            name='about',
            field=models.TextField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='profile',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to='resumes/'),
        ),
    ]