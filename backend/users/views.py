from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import Company, UserProfile
from .serializers import UserSerializer, CompanySerializer

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "RecruitAI Backend Working"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUser]

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_company_user(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist:
        return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    first_name = request.data.get('first_name', '')
    
    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name)
    # Signal already creates a profile; update it with company and role
    profile = user.profile
    profile.company = company
    profile.role = 'company'
    profile.save()
    
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def my_company(request):
    if not hasattr(request.user, 'profile') or not request.user.profile.company:
        return Response({"error": "User is not associated with any company"}, status=status.HTTP_404_NOT_FOUND)
        
    company = request.user.profile.company
    
    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data)
        
    elif request.method == 'PATCH':
        serializer = CompanySerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
