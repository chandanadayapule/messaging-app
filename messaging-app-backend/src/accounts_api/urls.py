from django.conf.urls import url
from django.contrib import admin

from .views import (UserCreateAPIView, UserListAPIView, SearchUserView)

'''
Exposing apis for
1. Registering an user 
2. listing users 
3. searching users  
'''


urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    url(r'^$', UserListAPIView.as_view(), name='user-list'),
    url(r'^search/user/$', SearchUserView.as_view(), name='search-user-list'),
]