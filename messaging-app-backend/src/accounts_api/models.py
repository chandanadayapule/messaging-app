from django.db import models
# from django.contrib.auth.models import User
# from django.dispatch import receiver
# from django.db.models.signals import post_save # Produce a signal if there is any database action.
#
# from django.contrib.auth.models import AbstractBaseUser
# from django.contrib.auth.models import AbstractUser
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete= models.CASCADE )
#
#     # user = models.OneToOneField(User)
#     # phone = models.CharField(max_length=256, blank=True, null=True)
#     profile_image = models.ImageField(upload_to='pictures/%Y/%m/%d/', max_length=255, null=True, default=False)
#
# # class Profile(models.Model):
# #     user = models.OneToOneField(User, on_delete= models.CASCADE,null=True )
# #     # occupation = models.CharField(max_length=150, null=True, blank=True)
# #     # phone = models.CharField(max_length=30, null=True)
# #     # address = models.CharField(max_length=250, null=True, blank=True)
# #     # city = models.CharField(max_length=150, null=True, blank=True)
# #     # username = models.CharField(max_length=100,null=True)
# #     # first_name = models.TextField(null=True)
# #     # last_name = models.TextField(null=True)
# #     # email = models.CharField(max_length=100, null=True)
# #     # password = models.CharField(max_length=100, null=True)
# #     # gender = models.TextField(null=True)
# #     profile_image = models.ImageField(upload_to='pictures/%Y/%m/%d/', max_length=255, null=True, default=False)
# #     objects = models.Manager()
