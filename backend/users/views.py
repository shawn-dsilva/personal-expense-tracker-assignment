from rest_framework.views import APIView
from rest_framework.response import Response


class ProtectedView(APIView):

    def get(self, request):
        content = {"message": "This is a protected resource."}
        return Response(content)
