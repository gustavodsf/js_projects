#coding: utf-8
from django.conf.urls import url, include
from map import views

urlpatterns = [
    url(r'^gera/mapeamento/gps/linha$',views.geraMapeamento,  name='geraMapeamento')
]
