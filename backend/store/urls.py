from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
from .views import RegisterView
from .views import my_orders
from .views import OrderCreateView
from .views import CreateOrderView
router = DefaultRouter()
router.register(r'products', ProductViewSet)
from .views import create_order
from .views import MyOrdersView
urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('', include(router.urls)),
    path('orders/', create_order, name='create-order'),
    path('my-orders/', my_orders, name='my-orders'),
    path("orders/", OrderCreateView.as_view(), name="create-order"),
    path("orders/create/", CreateOrderView.as_view(), name="create-order"),
    path("orders/my/", MyOrdersView.as_view(), name="my-orders"),
]