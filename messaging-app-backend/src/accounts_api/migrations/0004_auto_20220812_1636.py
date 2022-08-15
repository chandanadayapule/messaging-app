# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-08-12 11:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_api', '0003_auto_20220812_1636'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='image',
        ),
        migrations.AddField(
            model_name='profile',
            name='profile_image',
            field=models.ImageField(max_length=255, null=True, upload_to='pictures/%Y/%m/%d/'),
        ),
    ]
