# main urls.py (Project Level)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('Authentication.urls')),
    path('feed/', include('Feed.urls')),
    path('jobs/', include('Jobs.urls')),
    path('profile/', include('Profile.urls'))
]
