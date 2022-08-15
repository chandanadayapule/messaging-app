from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.generics import (CreateAPIView, ListAPIView)
from rest_framework.permissions import (AllowAny,)
from .serializers import (UserCreateSerializer, UserListSerializer,)


User = get_user_model()


class UserCreateAPIView(CreateAPIView):
    serializer_class   = UserCreateSerializer
    queryset           = User.objects.all()
    permission_classes = (AllowAny,)



class UserListAPIView(ListAPIView):
    serializer_class = UserListSerializer
    def get_queryset(self, *args, **kwargs):
        username       = self.request.GET.get("username")
        queryset_list  = User.objects.filter(~Q(username=username))
        return queryset_list



class SearchUserView(ListAPIView):
    serializer_class = UserListSerializer
    def get_queryset(self, *args, **kwargs):
           # result = super(SearchUserView, self).get_queryset()
           search_query = self.request.GET.get('search')
           username = self.request.GET.get('username')
           if search_query:
               queryset_list = User.objects.filter(username__contains=search_query).exclude(username=username)
               return queryset_list
           else:
               return []

