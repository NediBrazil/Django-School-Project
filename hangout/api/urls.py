from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, OptionViewSet, VoteViewSet, ParticipantViewSet
from .views import register_view, login_view

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'options', OptionViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
]