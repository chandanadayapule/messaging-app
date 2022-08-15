# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2022-08-12 11:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_api', '0004_auto_20220812_1636'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='firstname',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='lastname',
            new_name='last_name',
        ),
        migrations.AddField(
            model_name='profile',
            name='password',
            field=models.CharField(max_length=100, null=True),
        ),
    ]