from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Option(models.Model):
    event = models.ForeignKey(Event, related_name='options', on_delete=models.CASCADE)
    time = models.DateTimeField()
    location = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.location} - {self.time}"

class Vote(models.Model):
    option = models.ForeignKey(Option, related_name='votes', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('option', 'user') 

    def __str__(self):
        return f"{self.user.username} voted for {self.option}"

class Participant(models.Model):
    event = models.ForeignKey(Event, related_name='participants', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('event', 'user')

    def __str__(self):
        return f"{self.user.username} joined {self.event.title}"
