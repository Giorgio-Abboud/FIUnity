from django.contrib import admin
from .models import Profile, Experience, Project, Extracurricular

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'graduation_year', 'career_interest')
    search_fields = ('user__username', 'first_name', 'last_name', 'career_interest')
    list_filter = ('graduation_year',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('user', 'job_position', 'start_date', 'end_date', 'company')
    search_fields = ('user__username', 'job_position', 'company')
    list_filter = ('start_date', 'end_date', 'company')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'description')
    search_fields = ('user__username', 'name')
    list_filter = ('user',)

@admin.register(Extracurricular)
class ExtracurricularAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'description')
    search_fields = ('user__username', 'name')
    list_filter = ('user',)
