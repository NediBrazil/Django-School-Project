from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, OptionViewSet, VoteViewSet, ParticipantViewSet
from .views import ReactHomeView

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'options', OptionViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path("", ReactHomeView.as_view(), name="react-home"),
    path('api/', include(router.urls)),
]