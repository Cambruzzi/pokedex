from django.db import models

# Create your models here.
class Pokemon(models.Model):
    nome = models.CharField(max_length=255)
    national_dex = models.IntegerField()