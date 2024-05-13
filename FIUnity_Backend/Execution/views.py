from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

# from django.http import HttpResponse

class ReactLogin(APIView):
    # Display the email and PID output
    def get(self, request):
        output = [{"email": output.email,
                    "PID": output.PID}
                    for output in User.objects.all()]
        return Response(output)
    
    # Saved the data to the React serializer method
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)