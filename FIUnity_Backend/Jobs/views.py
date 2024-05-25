# jobs/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobPosting
from .serializers import JobPostingSerializer

# from rest_framework.parsers import MultiPartParser, FormParser
#from rest_framework.authentication import SessionAuthentication
#from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny 


class JobPostingView(APIView):
    
    permission_classes = [AllowAny]
    #authentication_classes = [SessionAuthentication]

    def get(self, request):
        job_postings = JobPosting.objects.all()
        serializer = JobPostingSerializer(job_postings, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Received JSON data:", request.data)
        serializer = JobPostingSerializer(data=request.data)
        print("After serializer")
        if serializer.is_valid():
            print("After valid")
            serializer.save()
            print("After save")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log the serializer errors to the console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
