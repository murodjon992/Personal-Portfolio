from django.urls import path

from .views import ContactMessageCreateView, ProfileView, ProjectListView, ServiceListView

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("services/", ServiceListView.as_view(), name="service-list"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
]
