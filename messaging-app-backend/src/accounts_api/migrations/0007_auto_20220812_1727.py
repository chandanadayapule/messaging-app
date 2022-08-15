# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-08-12 11:57
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts_api', '0006_auto_20220812_1658'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='username',
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='profile',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_image',
            field=models.ImageField(default=False, max_length=255, null=True, upload_to='pictures/%Y/%m/%d/'),
        ),
    ]
