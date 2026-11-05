from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, Profile, Project, Service
from .serializers import (
    ContactMessageSerializer,
    ProfileSerializer,
    ProjectSerializer,
    ServiceSerializer,
)
from .utils import notify_new_contact_message


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({})
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(is_published=True)


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(is_published=True)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        notify_new_contact_message(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
