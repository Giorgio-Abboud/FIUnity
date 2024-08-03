# main urls.py (Project Level)
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('Authentication.urls')),
    path('feed/', include('Feed.urls')),
    path('jobs/', include('Jobs.urls')),
    path('profile/', include('Profile.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)