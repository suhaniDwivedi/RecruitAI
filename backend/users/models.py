from django.db import models
from django.contrib.auth.models import User

def default_interview_stages():
    return [
        {"id": "initial", "name": "Initial Screening", "order": 1},
        {"id": "technical", "name": "Technical Interview", "order": 2},
        {"id": "behavioral", "name": "Behavioral Interview", "order": 3},
        {"id": "final", "name": "Final Review", "order": 4}
    ]

def default_email_templates():
    return {
        "application_received": "Hi {name}, we received your application for {job_title}.",
        "interview_scheduled": "Hi {name}, your interview for {job_title} has been scheduled for {date}.",
        "rejection": "Hi {name}, thank you for your interest in {company_name}. Unfortunately, we will not be moving forward with your application at this time."
    }

class Company(models.Model):
    name = models.CharField(max_length=255)
    domain = models.URLField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    
    # Settings
    hiring_preferences = models.JSONField(default=dict, blank=True)
    interview_stages = models.JSONField(default=default_interview_stages, blank=True)
    email_templates = models.JSONField(default=default_email_templates, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('company', 'Company'),
        ('student', 'Student'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='company')

    def __str__(self):
        return f"{self.user.username}'s profile ({self.role})"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        role = 'company'
        if instance.is_superuser or instance.is_staff:
            role = 'admin'
        UserProfile.objects.create(user=instance, role=role)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
