from rest_framework import serializers
from .models import Event, Option, Vote, Participant
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class OptionSerializer(serializers.ModelSerializer):
    votes_count = serializers.IntegerField(source='votes.count', read_only=True)

    class Meta:
        model = Option
        fields = ['id', 'time', 'location', 'event', 'votes_count']


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vote
        fields = ['id', 'option', 'user']


class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = ['id', 'event', 'user']


class EventSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    options = OptionSerializer(many=True, read_only=True)
    participants = ParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'created_by', 'created_at', 'options', 'participants']
