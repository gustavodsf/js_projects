from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import sys
import MapeamentoLinha


@api_view(['GET'])
def geraMapeamento(request):
    if request.method == 'GET':
        mapeamento = MapeamentoLinha.MapeamentoLinha();
        return Response(mapeamento.gera())
