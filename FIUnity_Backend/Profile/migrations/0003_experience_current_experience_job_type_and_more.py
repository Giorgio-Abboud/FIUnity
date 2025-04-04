# Generated by Django 5.0.6 on 2024-06-02 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_profile_grad_term_profile_major_skill'),
    ]

    operations = [
        migrations.AddField(
            model_name='experience',
            name='current',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='experience',
            name='job_type',
            field=models.CharField(choices=[('FULL-TIME', 'Full-time'), ('PART-TIME', 'Part-time'), ('SELF-EMPLOYED', 'Self-employed'), ('FREELANCE', 'Freelance'), ('CONTRACT', 'Contract'), ('INTERNSHIP', 'Internship'), ('APPRENTICESHIP', 'Apprenticeship'), ('SEASONAL', 'Seasonal')], default='', max_length=14),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='experience',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
