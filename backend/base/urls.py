from django.urls import path
from . import views



urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.RegisterUser.as_view(), name='register'),
    path('users/profile/' , views.UserProfile.as_view(), name="users-profile"),
    path('users/' , views.GetUsers.as_view(), name="users"),
    path('products/' , views.Products.as_view(), name="products"),
    path('products/<str:pk>/reviews/' , views.ProductReview.as_view(), name="create-review"),
    path('products/<str:pk>/' , views.Products.as_view(), name="products"),
    path('orders/add/', views.OrderItems.as_view(), name='orders-add'),
    path('orders/myorders/', views.GetMyOrders.as_view(), name='myorders'),
    path('orders/<str:pk>/', views.GetOrderById.as_view(), name='user-order'),
    path('orders/<str:pk>/pay/', views.UpdateOrderToPaid.as_view(), name='pay'),
    
]


