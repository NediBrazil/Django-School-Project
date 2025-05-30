from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, OptionViewSet, VoteViewSet, ParticipantViewSet
from .views_auth import signup_view, login_view, logout_view

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'options', OptionViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup_view),
    path('login/', login_view),
    path('logout/', logout_view),
]