from django.db import models

class ProductCategory(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Phone(models.Model):
    title = models.CharField(max_length=200)
    price = models.CharField(max_length=100)
    image = models.CharField(max_length=200)
    categorie = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    

class PhoneDetails(models.Model):
    product = models.ForeignKey(Phone, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    cellular_technology = models.CharField(max_length=100)
    memory_storage_capacity = models.CharField(max_length=100)
    screen_size = models.CharField(max_length=100)
    about = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.brand