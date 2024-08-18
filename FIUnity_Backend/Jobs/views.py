from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobPosting
from .serializers import JobPostingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404

class JobPostingView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        job_postings = JobPosting.objects.all()
        serializer = JobPostingSerializer(job_postings, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Received JSON data:", request.data)
        serializer = JobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate the post with the current user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        job_posting = get_object_or_404(JobPosting, pk=pk)
        job_posting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
