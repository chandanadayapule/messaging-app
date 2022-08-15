from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Max
import time
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView, 
    UpdateAPIView,
)
from .pagination import MsgPageNumberPagination
from django.db.models import Q
from django.contrib.auth import get_user_model
from messaging_api.models import Message
from .serializers import (
    MsgCreateSerializer,
    MsgListSerializer,
    MessageDetailSerializer,
    ConversationCreateSerializer,
    ConversationListSerializer,
    ConversationDetailSerializer,
    ConversationUpdateSerializer,

)
from drf_extra_fields.fields import Base64ImageField

from rest_framework.views import APIView
from itertools import chain
from operator import attrgetter

User = get_user_model()

class MsgCreateAPIView(CreateAPIView):
    serializer_class = MsgCreateSerializer
    def post(self, request, *args, **kwargs):
        request.data['msg_sender'] = User.objects.get(username=request.data['msg_sender']).id
        request.data['msg_receiver'] = User.objects.get(username=request.data['msg_receiver']).id
        return self.create(request, *args, **kwargs)

class MsgListAPIView(ListAPIView):
    serializer_class = MsgListSerializer
    pagination_class = MsgPageNumberPagination
    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get("conversation_id")
        queryset_list = Message.objects.filter(conversation_id=query).order_by('-timestamp')
        return queryset_list

class MsgArchiveAPIView(UpdateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageDetailSerializer
    def put(self, request, *args, **kwargs):
        print(kwargs['pk'])
        return self.update(request, *args, **kwargs)

class MsgDeleteAPIView(DestroyAPIView):
    queryset = Message.objects.all()
    def delete(self, request, *args, **kwargs):
        print(kwargs['pk'])
        return self.destroy(request, *args, **kwargs)

class ConversationCreateAPIView(CreateAPIView):
    serializer_class = ConversationCreateSerializer
    def post(self, request, *args, **kwargs):
        request.data['conversation_id'] = int(round(time.time() * 1000))
        request.data['msg_sender']      = User.objects.get(username=request.data['msg_sender']).id
        request.data['msg_receiver']    = User.objects.get(username=request.data['msg_receiver']).id
        return self.create(request, *args, **kwargs)

class ConversationListAPIView(ListAPIView):
    serializer_class  = ConversationListSerializer
    # pagination_class = MsgPageNumberPagination
    def get_queryset(self, *args, **kwargs):
        query          = self.request.GET.get("username")
        archived_value = self.request.GET.get('archived').title()
        actions_id = Message.objects.filter(
                Q(msg_sender__username=query) | Q(msg_receiver__username=query) , archived=archived_value
            ).values('conversation_id').annotate(action_id=Max('id')).order_by('-action_id').values_list('action_id', flat=True)
        queryset_list = Message.objects.filter(
                id__in=actions_id
            ).order_by('-timestamp')
        return queryset_list

class ConversationArchivedAPIView(UpdateAPIView):
    queryset            = Message.objects.all()
    serializer_class    = ConversationUpdateSerializer
    lookup_field        = 'conversation_id'
    def put(self, request, *args, **kwargs):
        archived_value = request.data['archived']
        instance       = Message.objects.filter(conversation_id=kwargs['conversation_id']).update(archived=archived_value)
        return JsonResponse({'success': 'successfully archived message'})

class ConversationDeleteAPIView(DestroyAPIView):
    serializer_class = ConversationListSerializer
    lookup_field = 'conversation_id'
    def delete(self, request, *args, **kwargs):
        username = self.request.GET.get("username")
        msg_sender_id = Message.objects.get(conversation_id=kwargs['conversation_id']).msg_sender_id
        if User.objects.get(username=username).id == msg_sender_id:
            instance = Message.objects.filter(conversation_id=kwargs['conversation_id']).delete()
            return JsonResponse({"status": 'success', "message": 'successfully deleted message'})
        else:
            return JsonResponse({'status': 'failure', 'message': 'You cannot delete this message'})


class ConversationDeliverAPIView(UpdateAPIView):
    queryset = Message.objects.all()
    serializer_class = ConversationUpdateSerializer
    lookup_field = 'conversation_id'

    def put(self, request, *args, **kwargs):
        delivered_value = request.data['delivered']
        instance        = Message.objects.filter(conversation_id=kwargs['conversation_id']).update(delivered=delivered_value)
        return JsonResponse({"status":'success', "message": 'successfully delivered message'})


class ConversationReadAPIView(UpdateAPIView):
    queryset         = Message.objects.all()
    serializer_class = ConversationUpdateSerializer
    lookup_field         = 'conversation_id'

    def put(self, request, *args, **kwargs):
        read_value = request.data['read']
        instance = Message.objects.filter(conversation_id=kwargs['conversation_id']).update(read=read_value)
        return JsonResponse({"status":'success', "message": 'successfully read message'})


class ConversationAPIView(APIView):

    def get(self, *args, **kwargs):
        msg_sender=self.request.GET.get('msg_sender')
        msg_receiver=self.request.GET.get('msg_receiver')
        actions_id = Message.objects.filter(
            Q(msg_sender__username=msg_sender, msg_receiver__username=msg_receiver) |
            Q(msg_receiver__username=msg_sender, msg_sender__username=msg_receiver)
        ).values('conversation_id').annotate(action_id=Max('id')).order_by('-action_id').values_list('action_id',
                                                                                                     flat=True)
        queryset_list = Message.objects.filter(
            id__in=actions_id
        ).order_by('-timestamp')
        result = []
        for query in queryset_list:
            result.append({
            "id"                   : query.id,
            "msg_sender_data"      : User.objects.filter(id=query.msg_sender_id).values("id", "username", "first_name","last_name","email")[0],
            "msg_receiver_data"    : User.objects.filter(id=query.msg_receiver_id).values("id", "username", "first_name","last_name","email")[0],
            "message"              : query.message,
            "image"                : query.image if query.image else "",
            "file"                 : query.file if query.file else "",
            "conversation_id"      : query.conversation_id,
            "conversation_subject" : query.conversation_subject,
            "archived"             : query.archived,
            "publish"              : query.publish,
            "timestamp"            : query.timestamp,
            "updated"              : query.updated
        })
        return Response(result)

'''


'''
class UserConversationAPIView(APIView):
    def get(self, *args, **kwargs):

        def is_latest(qs, message):
            if qs:
                if message.timestamp < qs[0].timestamp:
                    return False
            return True
        query     = self.request.GET.get("username")
        user      = User.objects.get(username=query)
        sent      = Message.objects.filter(msg_sender=user).order_by('msg_receiver', '-timestamp').distinct('msg_receiver')
        received  = Message.objects.filter(msg_receiver=user).order_by('msg_sender', '-timestamp').distinct('msg_sender')
        messages  = list(sorted(chain(sent, received), key = attrgetter('timestamp'), reverse=True))

        contact_list = []
        for message in messages:
            if message.msg_sender == user:
                c = message.msg_receiver
                if not is_latest(received.filter(msg_sender=c), message): continue
            else:
                c = message.msg_sender
                if not is_latest(sent.filter(msg_receiver=c), message): continue

            contact_list.append({'id'            : c.id,
                                 'username'      : User.objects.filter(id=c.id).values("username")[0]["username"],
                                 'email'         : c.email,
                                 'first_name'    : c.first_name,
                                 'last_name'     : c.last_name,
                                 'last_message'  : message.message,
                                 'timestamp'     : message.timestamp,
                                 'read'          : message.read,
                                 'delivered'     : message.delivered,
                                 'msg_sender'    : str(message.msg_sender),
                                 'msg_receiver'  : str(message.msg_receiver),
                                 })

        return Response({'status': "success", 'result': contact_list})




