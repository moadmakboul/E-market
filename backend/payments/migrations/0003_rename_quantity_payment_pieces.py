# Generated by Django 4.2.4 on 2023-09-19 14:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_rename_order_payment_item'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='quantity',
            new_name='pieces',
        ),
    ]
